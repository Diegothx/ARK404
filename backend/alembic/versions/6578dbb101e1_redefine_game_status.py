"""redefine game status

Revision ID: 4fb14808d7ee
Revises: a1ecb66b0df0
Create Date: 2026-02-19 01:36:43.831434
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "4fb14808d7ee"
down_revision = "a1ecb66b0df0"
branch_labels = None
depends_on = None

def upgrade() -> None:
    # 1️⃣ Create the new enum type
    op.execute(
        "CREATE TYPE gamestatus_new AS ENUM ("
        "'wishlist', 'backlog', 'playing', 'casual', 'on_hold', "
        "'finished_main', 'finished_100', 'dropped');"
    )

    # 2️⃣ Update existing data to match new enum values
    op.execute("UPDATE game_backlog SET status = 'backlog' WHERE status IN ('installed', 'next_up');")
    op.execute("UPDATE game_backlog SET status = 'finished_main' WHERE status = 'finished_dlc';")
    op.execute("UPDATE game_backlog SET status = 'dropped' WHERE status = 'soft_dropped';")

    # 3️⃣ Alter column to use new enum
    op.execute(
        "ALTER TABLE game_backlog "
        "ALTER COLUMN status TYPE gamestatus_new "
        "USING status::text::gamestatus_new;"
    )

    # 4️⃣ Drop old enum type
    op.execute("DROP TYPE gamestatus;")

    # 5️⃣ Rename new enum to the original name
    op.execute("ALTER TYPE gamestatus_new RENAME TO gamestatus;")


def downgrade() -> None:
    # 1️⃣ Recreate the old enum type
    op.execute(
        "CREATE TYPE gamestatus_old AS ENUM ("
        "'wishlist', 'backlog', 'installed', 'next_up', 'playing', "
        "'on_hold', 'finished_main', 'finished_100', 'finished_dlc', "
        "'dropped', 'soft_dropped');"
    )

    # 2️⃣ Map new values back to old ones
    op.execute("UPDATE game_backlog SET status = 'installed' WHERE status = 'backlog';")  # optional
    op.execute("UPDATE game_backlog SET status = 'finished_dlc' WHERE status = 'finished_main';")  # optional
    op.execute("UPDATE game_backlog SET status = 'soft_dropped' WHERE status = 'dropped';")  # optional

    # 3️⃣ Alter column to use old enum
    op.execute(
        "ALTER TABLE game_backlog "
        "ALTER COLUMN status TYPE gamestatus_old "
        "USING status::text::gamestatus_old;"
    )

    # 4️⃣ Drop new enum type
    op.execute("DROP TYPE gamestatus;")

    # 5️⃣ Rename old enum back
    op.execute("ALTER TYPE gamestatus_old RENAME TO gamestatus;")

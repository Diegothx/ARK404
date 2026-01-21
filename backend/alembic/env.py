from __future__ import with_statement

import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

# Alembic Config object
config = context.config

# Configure logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ------------------------------------------------------------------
# Import your SQLAlchemy Base and models
# ------------------------------------------------------------------

from app.db.base import Base

# IMPORTANT:
# Import *all* models so Alembic can detect them
import app.db.models  # noqa: F401

target_metadata = Base.metadata

# ------------------------------------------------------------------
# Database URL (Docker + .env compatible)
# ------------------------------------------------------------------

def get_database_url() -> str:
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")
    name = os.getenv("DB_NAME")

    if not all([user, password, host, name]):
        raise RuntimeError("Database environment variables are not fully set")

    if port:
        return f"postgresql://{user}:{password}@{host}:{port}/{name}"
    else:
        return f"postgresql://{user}:{password}@{host}/{name}"


config.set_main_option("sqlalchemy.url", get_database_url())

# ------------------------------------------------------------------
# Offline migrations (SQL output)
# ------------------------------------------------------------------

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,      # detect column type changes
        compare_server_default=True,
    )

    with context.begin_transaction():
        context.run_migrations()

# ------------------------------------------------------------------
# Online migrations (DB connection)
# ------------------------------------------------------------------

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )

        with context.begin_transaction():
            context.run_migrations()


# ------------------------------------------------------------------
# Entry point
# ------------------------------------------------------------------

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

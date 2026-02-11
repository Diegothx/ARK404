import os
import aiosmtplib
from email.message import EmailMessage
from typing import Optional

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL")


async def send_guestbook_notification(
    name: str,
    message: str,
    user_email: Optional[str] = None,
):
    msg = EmailMessage()
    msg["From"] = SMTP_USER
    msg["To"] = NOTIFY_EMAIL
    msg["Subject"] = "New Guestbook Entry"

    # Build email body safely
    body = f"""
    New guestbook entry received:

    Name: {name}
    """

    if user_email:
        body += f"Email: {user_email}\n"

    body += f"""
    Message:
    {message}
    """

    msg.set_content(body)

    await aiosmtplib.send(
        msg,
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        start_tls=True,
        username=SMTP_USER,
        password=SMTP_PASS,
    )

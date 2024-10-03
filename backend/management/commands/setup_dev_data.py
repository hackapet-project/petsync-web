from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction


class Command(BaseCommand):
    help = "Set up development data for RefuPet"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Reset all users before creating development data",
        )

    def handle(self, *args, **options):
        with transaction.atomic():
            if options["reset"]:
                self.stdout.write("🔄 Resetting existing users...")
                User.objects.all().delete()

            # Create admin user
            admin_user, created = User.objects.get_or_create(
                username="admin",
                defaults={
                    "email": "admin@refupet.local",
                    "first_name": "Admin",
                    "last_name": "User",
                    "is_staff": True,
                    "is_superuser": True,
                    "is_active": True,
                },
            )
            if created:
                # Generate a random password for development
                import secrets
                import string
                password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(12))
                admin_user.set_password(password)
                admin_user.save()
                self.stdout.write(
                    self.style.SUCCESS(f"✅ Created admin user - Username: admin, Password: {password}")
                )
            else:
                self.stdout.write("ℹ️ Admin user already exists")

            # Create staff user
            staff_user, created = User.objects.get_or_create(
                username="staff",
                defaults={
                    "email": "staff@refupet.local",
                    "first_name": "Staff",
                    "last_name": "Member",
                    "is_staff": True,
                    "is_superuser": False,
                    "is_active": True,
                },
            )
            if created:
                import secrets
                import string
                password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(12))
                staff_user.set_password(password)
                staff_user.save()
                self.stdout.write(
                    self.style.SUCCESS(f"✅ Created staff user - Username: staff, Password: {password}")
                )
            else:
                self.stdout.write("ℹ️ Staff user already exists")

            # Create volunteer user
            volunteer_user, created = User.objects.get_or_create(
                username="volunteer",
                defaults={
                    "email": "volunteer@refupet.local",
                    "first_name": "Volunteer",
                    "last_name": "Helper",
                    "is_staff": False,
                    "is_superuser": False,
                    "is_active": True,
                },
            )
            if created:
                import secrets
                import string
                password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(12))
                volunteer_user.set_password(password)
                volunteer_user.save()
                self.stdout.write(
                    self.style.SUCCESS(f"✅ Created volunteer user - Username: volunteer, Password: {password}")
                )
            else:
                self.stdout.write("ℹ️ Volunteer user already exists")

        self.stdout.write(
            self.style.SUCCESS("\n🎉 Development data setup complete!")
        )
        self.stdout.write("💡 Passwords are randomly generated each time for security.")
        self.stdout.write("💡 Copy the passwords from the output above to log in.")
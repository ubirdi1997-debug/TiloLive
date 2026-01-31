#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class TiloLiveAPITester:
    def __init__(self, base_url="https://tilo-rebrand.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_result(self, test_name, success, response_data=None, error=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED")
        else:
            print(f"❌ {test_name} - FAILED")
            if error:
                print(f"   Error: {error}")
            self.failed_tests.append({
                "test": test_name,
                "error": str(error) if error else "Unknown error",
                "response": response_data
            })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            self.log_result("API Root", success, data, None if success else f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("API Root", False, None, str(e))
            return False

    def test_public_settings(self):
        """Test public settings endpoint"""
        try:
            response = requests.get(f"{self.api_url}/settings", timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            if success and data:
                # Check if required fields exist
                required_fields = ['siteTitle', 'heroHeadline', 'contactEmail']
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    success = False
                    self.log_result("Public Settings", False, data, f"Missing fields: {missing_fields}")
                else:
                    self.log_result("Public Settings", True, data)
            else:
                self.log_result("Public Settings", False, data, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("Public Settings", False, None, str(e))
            return False

    def test_admin_login(self, password="admin123"):
        """Test admin login"""
        try:
            payload = {"password": password}
            response = requests.post(f"{self.api_url}/admin/login", json=payload, timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data and 'token' in data:
                self.token = data['token']
                self.log_result("Admin Login", True, {"success": data.get('success')})
            else:
                self.log_result("Admin Login", False, data, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("Admin Login", False, None, str(e))
            return False

    def test_contact_submission(self):
        """Test contact form submission"""
        try:
            payload = {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "+91 9876543210",
                "subject": "Test Subject",
                "message": "This is a test message"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            self.log_result("Contact Submission", success, data, None if success else f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("Contact Submission", False, None, str(e))
            return False

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        try:
            payload = {"email": f"test_{datetime.now().strftime('%H%M%S')}@example.com"}
            response = requests.post(f"{self.api_url}/newsletter", json=payload, timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            self.log_result("Newsletter Subscription", success, data, None if success else f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("Newsletter Subscription", False, None, str(e))
            return False

    def test_admin_endpoints(self):
        """Test admin-only endpoints"""
        if not self.token:
            self.log_result("Admin Endpoints", False, None, "No admin token available")
            return False

        headers = {"Authorization": f"Bearer {self.token}"}
        endpoints = [
            ("Admin Settings", f"{self.api_url}/admin/settings"),
            ("Admin Messages", f"{self.api_url}/admin/messages"),
            ("Admin Newsletters", f"{self.api_url}/admin/newsletters"),
            ("Admin SMTP Settings", f"{self.api_url}/admin/smtp-settings")
        ]

        all_passed = True
        for name, url in endpoints:
            try:
                response = requests.get(url, headers=headers, timeout=10)
                success = response.status_code == 200
                data = response.json() if success else None
                self.log_result(name, success, data, None if success else f"Status: {response.status_code}")
                if not success:
                    all_passed = False
            except Exception as e:
                self.log_result(name, False, None, str(e))
                all_passed = False

        return all_passed

    def test_admin_settings_update(self):
        """Test admin settings update"""
        if not self.token:
            self.log_result("Admin Settings Update", False, None, "No admin token available")
            return False

        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            payload = {
                "siteTitle": "Tilo Live Test",
                "heroHeadline": "Test Headline",
                "heroSubheadline": "Test Subheadline",
                "primaryColor": "#38bdf8",
                "secondaryColor": "#0ea5e9",
                "contactEmail": "test@tilolive.in",
                "contactPhone": "+91 82669 41716",
                "footerText": "© 2025 Tilo Live Test",
                "whatsappNumber": "+918266941716",
                "socialMedia": {
                    "facebook": "",
                    "instagram": "",
                    "twitter": "",
                    "youtube": ""
                }
            }
            response = requests.put(f"{self.api_url}/admin/settings", json=payload, headers=headers, timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            self.log_result("Admin Settings Update", success, data, None if success else f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("Admin Settings Update", False, None, str(e))
            return False

    def test_smtp_settings(self):
        """Test SMTP settings endpoints"""
        if not self.token:
            self.log_result("SMTP Settings", False, None, "No admin token available")
            return False

        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            payload = {
                "host": "smtp.hostinger.com",
                "port": 587,
                "username": "test@tilolive.in",
                "password": "testpassword",
                "from_email": "noreply@tilolive.in",
                "from_name": "Tilo Live"
            }
            response = requests.put(f"{self.api_url}/admin/smtp-settings", json=payload, headers=headers, timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            self.log_result("SMTP Settings Update", success, data, None if success else f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_result("SMTP Settings Update", False, None, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Tilo Live API Tests...")
        print("=" * 50)

        # Test basic connectivity
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False

        # Test public endpoints
        self.test_public_settings()
        self.test_contact_submission()
        self.test_newsletter_subscription()

        # Test admin functionality
        if self.test_admin_login():
            self.test_admin_endpoints()
            self.test_admin_settings_update()
            self.test_smtp_settings()
        else:
            print("❌ Admin login failed. Skipping admin tests.")

        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"  • {test['test']}: {test['error']}")

        return self.tests_passed == self.tests_run

def main():
    tester = TiloLiveAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
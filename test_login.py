#!/usr/bin/env python3
"""
Test script to verify login functionality
"""
import requests
import json
import sys

def test_login():
    # Test configuration
    BACKEND_URL = "https://tilolive.in"  # Change to your backend URL
    API_URL = f"{BACKEND_URL}/api/admin/login"
    
    print("=" * 60)
    print("LOGIN TEST SCRIPT")
    print("=" * 60)
    print(f"\nBackend URL: {BACKEND_URL}")
    print(f"API Endpoint: {API_URL}")
    print("\nTesting with credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("\n" + "=" * 60)
    
    # Test payload
    payload = {
        "username": "admin",
        "password": "admin123"
    }
    
    try:
        print("\nSending POST request...")
        response = requests.post(API_URL, json=payload, timeout=10)
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"\nResponse Body:")
        print(json.dumps(response.json(), indent=2))
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("\n✓✓✓ LOGIN SUCCESSFUL! ✓✓✓")
                print(f"Token: {data.get('token')}")
                return True
            else:
                print("\n✗✗✗ LOGIN FAILED - Success flag is False ✗✗✗")
                return False
        else:
            print(f"\n✗✗✗ LOGIN FAILED - HTTP {response.status_code} ✗✗✗")
            return False
            
    except requests.exceptions.ConnectionError as e:
        print(f"\n✗✗✗ CONNECTION ERROR ✗✗✗")
        print(f"Cannot connect to {BACKEND_URL}")
        print(f"Error: {e}")
        print("\nPossible reasons:")
        print("1. Backend server is not running")
        print("2. Wrong URL/port")
        print("3. Firewall blocking connection")
        return False
        
    except requests.exceptions.Timeout:
        print(f"\n✗✗✗ TIMEOUT ERROR ✗✗✗")
        print(f"Server took too long to respond")
        return False
        
    except Exception as e:
        print(f"\n✗✗✗ UNEXPECTED ERROR ✗✗✗")
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    success = test_login()
    sys.exit(0 if success else 1)

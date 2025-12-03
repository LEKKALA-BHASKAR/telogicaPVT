#!/bin/bash

# Nodemailer Integration Verification Script
# This script verifies that all nodemailer components are properly integrated

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0

check_pass() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
}

check_fail() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
}

# Start verification
print_header "Nodemailer Integration Verification"

# 1. Check email-server directory structure
print_info "Checking email-server directory structure..."
if [ -d "email-server" ]; then
    print_success "email-server directory exists"
    check_pass
else
    print_error "email-server directory not found"
    check_fail
fi

if [ -f "email-server/package.json" ]; then
    print_success "email-server/package.json exists"
    check_pass
else
    print_error "email-server/package.json not found"
    check_fail
fi

if [ -f "email-server/server.js" ]; then
    print_success "email-server/server.js exists"
    check_pass
else
    print_error "email-server/server.js not found"
    check_fail
fi

if [ -f "email-server/.env" ]; then
    print_success "email-server/.env exists"
    check_pass
else
    print_warning "email-server/.env not found (may be expected)"
    check_fail
fi

# 2. Check nodemailer installation
print_info "\nChecking nodemailer installation..."
cd email-server
if npm list nodemailer > /dev/null 2>&1; then
    VERSION=$(npm list nodemailer 2>/dev/null | grep nodemailer | head -1 | sed 's/.*nodemailer@//' | sed 's/ .*//')
    print_success "nodemailer installed (version: $VERSION)"
    check_pass
else
    print_error "nodemailer not installed in email-server"
    check_fail
fi
cd ..

# 3. Check email templates
print_info "\nChecking email templates..."
if [ -f "email-server/templates/emailTemplates.js" ]; then
    print_success "Email templates file exists"
    check_pass
    
    # Count template functions
    TEMPLATE_COUNT=$(grep -c "export const.*Template" email-server/templates/emailTemplates.js || echo "0")
    print_info "Found $TEMPLATE_COUNT email templates"
else
    print_error "Email templates file not found"
    check_fail
fi

# 4. Check email routes
print_info "\nChecking email server routes..."
if [ -f "email-server/routes/emailRoutes.js" ]; then
    print_success "Email routes file exists"
    check_pass
    
    # Count endpoints
    QUOTE_ENDPOINTS=$(grep -c "router.post('/quote/" email-server/routes/emailRoutes.js || echo "0")
    ORDER_ENDPOINTS=$(grep -c "router.post('/order/" email-server/routes/emailRoutes.js || echo "0")
    MESSAGE_ENDPOINTS=$(grep -c "router.post('/message/" email-server/routes/emailRoutes.js || echo "0")
    
    print_info "  Quote endpoints: $QUOTE_ENDPOINTS"
    print_info "  Order endpoints: $ORDER_ENDPOINTS"
    print_info "  Message endpoints: $MESSAGE_ENDPOINTS"
else
    print_error "Email routes file not found"
    check_fail
fi

# 5. Check email configuration
print_info "\nChecking email configuration..."
if [ -f "email-server/config/emailConfig.js" ]; then
    print_success "Email config file exists"
    check_pass
    
    if grep -q "nodemailer" email-server/config/emailConfig.js; then
        print_success "Nodemailer configured in email config"
        check_pass
    else
        print_error "Nodemailer not found in email config"
        check_fail
    fi
else
    print_error "Email config file not found"
    check_fail
fi

# 6. Check backend mail service
print_info "\nChecking backend mail service integration..."
if [ -f "backend/services/mailService.js" ]; then
    print_success "Backend mail service exists"
    check_pass
    
    # Check for mail service methods
    METHODS=$(grep -c "send.*:" backend/services/mailService.js || echo "0")
    print_info "Found $METHODS mail service methods"
else
    print_error "Backend mail service not found"
    check_fail
fi

# 7. Check backend routes integration
print_info "\nChecking backend routes integration..."
ROUTES_WITH_MAIL=0

for route_file in backend/routes/*.js; do
    if grep -q "MailService" "$route_file" 2>/dev/null; then
        ROUTES_WITH_MAIL=$((ROUTES_WITH_MAIL + 1))
        print_success "$(basename $route_file) uses MailService"
        check_pass
    fi
done

print_info "Total routes using MailService: $ROUTES_WITH_MAIL"

# 8. Check environment variables setup
print_info "\nChecking environment configuration..."

if [ -f "backend/.env" ]; then
    if grep -q "MAIL_SERVICE_BASE_URL" backend/.env; then
        print_success "MAIL_SERVICE_BASE_URL configured in backend"
        check_pass
    else
        print_warning "MAIL_SERVICE_BASE_URL not found in backend/.env"
        check_fail
    fi
fi

if [ -f "email-server/.env" ]; then
    REQUIRED_VARS=("EMAIL_USER" "EMAIL_PASSWORD" "ADMIN_EMAIL")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "$var" email-server/.env; then
            print_success "$var configured in email-server"
            check_pass
        else
            print_error "$var not found in email-server/.env"
            check_fail
        fi
    done
fi

# 9. Check frontend integration
print_info "\nChecking frontend API integration..."

FRONTEND_FILES_WITH_API=0
if [ -d "frontend/src" ]; then
    # Check for contact form
    if [ -f "frontend/src/components/GlobalContactForm.js" ]; then
        if grep -q "api/contact" frontend/src/components/GlobalContactForm.js; then
            print_success "Contact form integrated with API"
            check_pass
            FRONTEND_FILES_WITH_API=$((FRONTEND_FILES_WITH_API + 1))
        fi
    fi
    
    # Check for quotation modal
    if [ -f "frontend/src/components/QuotationModal.js" ]; then
        if grep -q "api/quotes" frontend/src/components/QuotationModal.js; then
            print_success "Quotation modal integrated with API"
            check_pass
            FRONTEND_FILES_WITH_API=$((FRONTEND_FILES_WITH_API + 1))
        fi
    fi
    
    print_info "Found $FRONTEND_FILES_WITH_API frontend components with API integration"
fi

# 10. Check documentation
print_info "\nChecking documentation..."

if [ -f "email-server/README.md" ]; then
    print_success "Email server README exists"
    check_pass
else
    print_warning "Email server README not found"
    check_fail
fi

if [ -f "NODEMAILER_INTEGRATION.md" ]; then
    print_success "Integration documentation exists"
    check_pass
else
    print_warning "Integration documentation not found"
    check_fail
fi

# Summary
print_header "Verification Summary"

print_info "Total checks: $TOTAL_CHECKS"
print_success "Passed: $PASSED_CHECKS"

if [ $PASSED_CHECKS -eq $TOTAL_CHECKS ]; then
    print_success "\n🎉 All checks passed! Nodemailer is fully integrated."
    exit 0
elif [ $PASSED_CHECKS -ge $((TOTAL_CHECKS * 80 / 100)) ]; then
    print_warning "\n⚠️  Most checks passed, but some items need attention."
    print_info "Failed: $((TOTAL_CHECKS - PASSED_CHECKS))"
    exit 0
else
    print_error "\n❌ Integration incomplete. Please review the errors above."
    print_info "Failed: $((TOTAL_CHECKS - PASSED_CHECKS))"
    exit 1
fi

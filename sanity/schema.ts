import { type SchemaTypeDefinition } from 'sanity'
import siteMetadataSchema from './schemas/site-metadata-schema'
import navbarSchema from './schemas/navbar-schema'
import footerSchema from './schemas/footer-schema'
import cookieConsent from './schemas/cookie-consent-schema'
import homeSchema from './schemas/home-schema'
import pricingSchema from './schemas/pricing-schema'
import contactSchema from './schemas/contact-schema'
import privacySchema from './schemas/privacy-schema'
import termsSchema from './schemas/terms-schema'
import dashboardNavbarSchema from './schemas/dashboard-navbar-schema'
import dashboardSchema from './schemas/dashboard-schema'
import dashboardChatSchema from './schemas/dashboard-chat-schema'
import dashboardAccountSchema from './schemas/dashboard-account-schema'
import dashboardHelpSchema from './schemas/dashboard-help-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteMetadataSchema,

    // Shared components
    navbarSchema,
    footerSchema,
    cookieConsent,

    // Website pages
    homeSchema,
    pricingSchema,
    contactSchema,
    privacySchema,
    termsSchema,

    // Dashboard components
    dashboardNavbarSchema,

    // Dashboard pages
    dashboardSchema,
    dashboardChatSchema,
    dashboardAccountSchema,
    dashboardHelpSchema,
  ],
}

# BookMyEvent
Your one-stop platform to book venues, vendors, and perfect every celebration.
pending....
https://docs.google.com/document/d/1BWX3vokUXdPTIpG1Lr8OGauAyY2GTLkRDizCpz0oq-U/edit?usp

BookMyEvent: Vendor Registration Flow Design
1. Objective
To create a straightforward, user-friendly, and accessible registration process for vendors of all backgrounds, including those with limited technical literacy, enabling them to easily join and utilize the BookMyEvent platform.
2. Login / Signup (Simple & Passwordless)
The first step is getting the vendor into the app without the hassle of remembering passwords.
Option 1: Google Sign-In
Icon: Google Logo (G)
Action: Tap to sign in using an existing Google account.
Benefit: Quick, familiar, and secure for many users.
Option 2: Mobile Number + OTP
Icon: Phone (📞)
Action:
Enter Mobile Number.
Tap "Send OTP" (One-Time Password).
Enter the received OTP code.
Tap "Verify".
Benefit: Highly accessible, doesn't require an email address, common in India.
Option 3: Facebook Login (Optional)
Icon: Facebook Logo (f)
Action: Tap to sign in using an existing Facebook account.
Benefit: Provides another familiar option for some users.
Database Interaction:
Upon successful login/signup, the system checks if the user (identified by email or phone number) already exists.
Basic user information (Name, Email/Phone) is saved or retrieved from the backend (e.g., Firebase Authentication, custom backend with PostgreSQL/MongoDB).
3. Vendor Profile Setup (Post-Login)
New users are immediately guided to complete their vendor profile. Existing users can access and edit their profile from their dashboard. The form should be clear, use simple language, and incorporate icons.
Required Fields:
👤 Full Name / Business Name:
Prompt: "Your Name or Business Name?"
Input: Text field.
🏷️ Category: (Select one or more relevant services)
Prompt: "What services do you offer?" (Choose all that apply)
Input: Checkboxes or Tappable Cards with Icons:
💍 Wedding Hall
🌳 Party Plot
🎧 DJ
🍲 Catering
📸 Photography
🎨 Decorator
💄 Makeup Artist
🎺 Band/Baaja
➕ Others (Specify)
🖼️ Profile Photo / Business Logo:
Prompt: "Upload your photo or logo."
Input: Image upload button.
📍 Business Address / Location:
Prompt: "Where is your business located?"
Input: Text area for address AND a "Pin on Map" button using Google Maps integration for accuracy.
📞 Phone Number:
Prompt: "Your contact number."
Input: Text field (Auto-filled from login if OTP method was used, but editable).
🗓️ Experience:
Prompt: "How many years of experience?"
Input: Number input or dropdown (e.g., 1 year, 2 years,... 10+ years).
💰 Minimum & Maximum Price (Approximate):
Prompt: "Price range per event (approx.)?"
Input: Two number fields (Min Price, Max Price). Add helper text like "e.g., ₹5,000 to ₹50,000".
⏰ Working Days & Hours:
Prompt: "When are you available?"
Input: Simple selection (e.g., Checkboxes for Days: Mon, Tue,... Sun; Time Pickers for Start/End Time).
✍️ Business Description:
Prompt: "Tell customers about your service (short intro)."
Input: Text area (limit characters if needed).
🏙️ Service Area / City / Pincode:
Prompt: "Which areas/cities do you serve?"
Input: Text field (allow multiple entries like "Ahmedabad, Gandhinagar" or specific Pincodes).
Optional Fields:
💬 WhatsApp Number:
Prompt: "WhatsApp number (if different from contact)?"
Input: Text field.
🗣️ Languages Spoken:
Prompt: "Languages you speak?"
Input: Multi-select dropdown or checkboxes (e.g., English, Hindi, Gujarati, etc.).
✨ Portfolio Upload (Photos/Videos):
Prompt: "Showcase your work! (Upload photos/videos)"
Input: Multiple file upload button. Crucial for visual services.
📄 GST / License / ID proof:
Prompt: "Upload business documents (Optional - builds trust)."
Input: File upload button(s). Clearly state it's optional.
📦 Available Packages:
Prompt: "Offer specific packages? (Optional)"
Input: A way to add package details (Name, Description, Price). Could be a simple repeating section.
✅ Accept Bookings on WhatsApp?
Prompt: "Allow customers to inquire/book via WhatsApp?"
Input: Yes/No toggle switch.
4. Optional Smart Features (Future Enhancements)
These can be added later to improve the vendor and user experience:
📅 Availability Calendar: Allow vendors to mark specific dates as booked or unavailable. Sync potentially with Google Calendar.
🔗 Shareable Profile Link: Generate a unique link for vendors to share their BookMyEvent profile externally.
🟢 Live Availability: Show users if a vendor is likely available based on their calendar (requires calendar feature).
⭐ Reviews & Ratings: Implement a system for customers to leave feedback after an event.
5. Registration Flow Summary
Launch App: Vendor opens the BookMyEvent app.
Login/Signup Screen: Vendor chooses OTP, Google, or Facebook.
Authentication: Vendor completes the chosen login method.
System Check: Backend verifies if the user is new or existing.
New User: Redirected to the "Vendor Profile Setup" form.
Existing User: Redirected to their Dashboard (with options like "Bookings", "Edit Profile", "Messages").
Profile Completion (New User): Vendor fills out the required fields. Basic validation (e.g., checking if required fields are filled) occurs.
Save Profile: Vendor submits the form. Profile data is saved to the database (MongoDB/PostgreSQL).
Dashboard Access: Vendor is taken to their main dashboard.
6. UI/UX & Accessibility Notes
Simplicity: Use clear, concise language. Avoid jargon.
Visual Cues: Add relevant icons next to each field label for quick recognition.
Localization: Consider offering the interface in regional languages (e.g., Hindi, Gujarati) based on user settings or location.
Auto-fill: Pre-populate fields like Phone Number whenever possible.
Progress Indicator: Show progress if the profile form is long or split into steps.
Help Text: Provide brief examples or explanations below complex fields (e.g., price range).
Error Handling: Clearly indicate missing or invalid fields upon submission attempt.
7. Technology Stack Considerations
Frontend: Next.js (Provides good structure and performance)
Backend: Node.js (if using Next.js API routes) or a separate backend framework.
Database: MongoDB (Flexible schema, good for evolving profiles) or PostgreSQL (Robust, relational).
Authentication: Firebase Authentication (Handles OTP, Google, Facebook easily) or a custom solution using libraries like Passport.js.
File Storage: Firebase Storage, AWS S3, or similar for storing profile pictures, portfolios, and documents.
Mapping: Google Maps Platform APIs (for address pinning and potentially service 

/**
 * Admin panel (Decap CMS) configuration.
 * Every form in /admin is defined here. Each "file" below edits one JSON file in /content.
 * Saving in the admin commits the change to GitHub, and Vercel redeploys the site (about a minute).
 */

type Field = Record<string, unknown>;

const str = (name: string, label: string, hint?: string, required = true): Field => ({
  name,
  label,
  widget: "string",
  required,
  ...(hint && { hint }),
});
const txt = (name: string, label: string, hint?: string, required = true): Field => ({
  name,
  label,
  widget: "text",
  required,
  ...(hint && { hint }),
});
/** A list of plain strings, one per line item. */
const strings = (name: string, label: string, hint?: string, required = true): Field => ({
  name,
  label,
  widget: "list",
  required,
  field: { name: "item", label: "Item", widget: "string" },
  ...(hint && { hint }),
});
const paragraphs = (name: string, label: string, hint?: string): Field => ({
  name,
  label,
  widget: "list",
  field: { name: "item", label: "Text", widget: "text" },
  ...(hint && { hint }),
});

const projectFields: Field[] = [
  str("name", "Project name"),
  str("slug", "URL name", "Used in the link, e.g. bound → /work/bound/. Lowercase, dashes, no spaces. Changing it breaks old links."),
  { name: "featured", label: "Show on the home page", widget: "boolean", default: true, hint: "Also creates the case study page. Keep 3 or 4 on." },
  str("kind", "Type of project", "e.g. Web app with admin panel"),
  str("year", "Year"),
  txt("outcome", "What it does (one line)", "For the person using it, not the tech."),
  txt("built", "What you built (1–2 sentences)"),
  strings("stack", "Tech used"),
  str("live", "Live site link", "Leave empty if there is no live site. The button is hidden.", false),
  str("code", "Code link", "GitHub repo or pull requests link."),
  str("codeLabel", "Code button text", "Leave empty for “Code”.", false),
  strings("badges", "Small tags", "e.g. Live, Open source, Team lead", false),
  {
    name: "image",
    label: "Screenshot",
    widget: "object",
    required: false,
    collapsed: true,
    hint: "Optional. A wide desktop screenshot. Without one, a text panel with the highlights is shown.",
    fields: [
      { name: "src", label: "Image", widget: "image", required: false },
      str("alt", "Describe the image", "For screen readers, e.g. “Home page with a Browse Courses button”.", false),
    ],
  },
  strings("highlights", "Three short facts", "Shown on the text panel when there's no screenshot.", false),
  {
    name: "caseStudy",
    label: "Case study page",
    widget: "object",
    collapsed: true,
    fields: [
      txt("problem", "The problem"),
      paragraphs("whatIBuilt", "What I built", "One point per item."),
      paragraphs("how", "How it works"),
      txt("result", "Result", "Real results only. If there are none yet, say so."),
      txt("learned", "What I learned"),
    ],
  },
];

export const cmsConfig = {
  load_config_file: false,
  backend: {
    name: "github",
    repo: "tusharrr5/portfolio",
    branch: "main",
    // base_url is set to the current site in the admin page, so login works on any domain.
    auth_endpoint: "api/decap/auth/",
    commit_messages: {
      update: "Update {{collection}} “{{slug}}” from admin",
      uploadMedia: "Upload “{{path}}” from admin",
      deleteMedia: "Delete “{{path}}” from admin",
    },
  },
  // On localhost, `npm run cms` lets you edit the files on your computer without logging in.
  local_backend: true,
  site_url: "https://tusharbhojwani.vercel.app",
  display_url: "https://tusharbhojwani.vercel.app",
  logo_url: "/icon.svg",
  media_folder: "public/images/uploads",
  public_folder: "/images/uploads",
  editor: { preview: false },
  collections: [
    {
      name: "site",
      label: "Website",
      editor: { preview: false },
      files: [
        {
          name: "profile",
          label: "Profile, links & settings",
          file: "content/profile.json",
          fields: [
            {
              name: "person",
              label: "You",
              widget: "object",
              fields: [
                str("name", "Name"),
                str("role", "Role", "e.g. Full-stack developer"),
                str("location", "Location"),
                str("timezone", "Time zone", "For the live clock. Keep Asia/Kolkata for India."),
                str("timezoneLabel", "Time zone label", "e.g. IST"),
                {
                  name: "education",
                  label: "Education",
                  widget: "object",
                  fields: [str("degree", "Degree"), str("school", "College"), str("years", "Years")],
                },
                {
                  name: "photo",
                  label: "Photo",
                  widget: "object",
                  hint: "Shown in the hero. A square image works best.",
                  fields: [
                    { name: "src", label: "Image", widget: "image", required: false },
                    str("alt", "Describe the photo", "For screen readers.", false),
                  ],
                },
              ],
            },
            {
              name: "links",
              label: "Contact links",
              widget: "object",
              fields: [
                str("email", "Email"),
                str("whatsapp", "WhatsApp number", "With country code, digits only, e.g. 919232928771. The contact form sends here."),
                txt("whatsappMessage", "WhatsApp button message", "Pre-typed text when someone taps the WhatsApp button."),
                str("github", "GitHub link"),
                str("linkedin", "LinkedIn link"),
                str("calendly", "Calendly link", "Optional. Shows a “Book a call” button.", false),
              ],
            },
            {
              name: "settings",
              label: "Settings",
              widget: "object",
              fields: [
                { name: "showPrices", label: "Show prices", widget: "boolean", hint: "Turn off to hide every price on the site." },
                str("currency", "Currency symbol"),
                {
                  name: "availability",
                  label: "Availability",
                  widget: "object",
                  fields: [
                    str("status", "Status (next to the green dot)", "e.g. Taking projects from December 2026"),
                    str("replyTime", "Reply time"),
                  ],
                },
              ],
            },
            {
              name: "seo",
              label: "Google & link previews",
              widget: "object",
              collapsed: true,
              fields: [
                str("title", "Page title", "Shown in the browser tab and on Google."),
                txt("description", "Description", "One or two sentences shown under the title on Google."),
              ],
            },
            {
              name: "footer",
              label: "Footer",
              widget: "object",
              collapsed: true,
              fields: [str("note", "Footer note")],
            },
          ],
        },
        {
          name: "hero",
          label: "Hero (top of the page)",
          file: "content/hero.json",
          fields: [
            txt("headline", "Headline"),
            str("emphasis", "Highlighted words", "Words from the headline shown in cyan. Must match exactly, or leave empty.", false),
            txt("supporting", "Text under the headline"),
            {
              name: "primaryCta",
              label: "Main button",
              widget: "object",
              collapsed: true,
              fields: [str("label", "Text"), str("href", "Link", "#contact goes to the contact form.")],
            },
            {
              name: "secondaryCta",
              label: "Second button",
              widget: "object",
              collapsed: true,
              fields: [str("label", "Text"), str("href", "Link")],
            },
            {
              name: "stats",
              label: "Numbers under the buttons",
              widget: "list",
              summary: "{{fields.value}} · {{fields.label}}",
              hint: "Only real, checkable numbers. Three fit best.",
              fields: [str("value", "Number", "e.g. 300+"), str("label", "What it means")],
            },
          ],
        },
        {
          name: "projects",
          label: "Projects & case studies",
          file: "content/projects.json",
          fields: [
            {
              name: "projects",
              label: "Projects",
              label_singular: "project",
              widget: "list",
              summary: "{{fields.name}}",
              collapsed: true,
              hint: "Drag to reorder. The first one is the big featured card.",
              fields: projectFields,
            },
          ],
        },
        {
          name: "services",
          label: "Services & prices",
          file: "content/services.json",
          fields: [
            {
              name: "services",
              label: "Services",
              label_singular: "service",
              widget: "list",
              summary: "{{fields.name}}",
              collapsed: true,
              hint: "The second one is marked “Recommended”.",
              fields: [
                str("name", "Name"),
                txt("goodFor", "Good for"),
                strings("includes", "What's included"),
                str("timeline", "Timeline", "e.g. 2 to 4 weeks"),
                { name: "priceFrom", label: "Starting price", widget: "number", value_type: "int", required: false, hint: "In rupees, no commas, e.g. 20000." },
                str("projectType", "Form option to preselect", "Must match one of the options in Contact form → Project types."),
              ],
            },
          ],
        },
        {
          name: "process",
          label: "Process",
          file: "content/process.json",
          fields: [
            {
              name: "steps",
              label: "Steps",
              label_singular: "step",
              widget: "list",
              summary: "{{fields.name}}",
              fields: [str("name", "Step name"), txt("body", "Description")],
            },
          ],
        },
        {
          name: "about",
          label: "About & skills",
          file: "content/about.json",
          fields: [
            str("heading", "Heading"),
            paragraphs("paragraphs", "Paragraphs"),
            {
              name: "stack",
              label: "Skills",
              label_singular: "group",
              widget: "list",
              summary: "{{fields.group}}",
              hint: "Only list tools you actually use.",
              fields: [str("group", "Group name", "e.g. Front end"), strings("items", "Tools")],
            },
          ],
        },
        {
          name: "faq",
          label: "FAQ",
          file: "content/faq.json",
          fields: [
            {
              name: "faq",
              label: "Questions",
              label_singular: "question",
              widget: "list",
              summary: "{{fields.q}}",
              fields: [str("q", "Question"), txt("a", "Answer")],
            },
          ],
        },
        {
          name: "testimonials",
          label: "Testimonials",
          file: "content/testimonials.json",
          fields: [
            {
              name: "testimonials",
              label: "Testimonials",
              label_singular: "testimonial",
              widget: "list",
              required: false,
              summary: "{{fields.name}}",
              hint: "The section stays hidden until you add one. Only real quotes, with permission.",
              fields: [
                txt("quote", "Quote"),
                str("name", "Name"),
                str("role", "Role and company"),
                str("link", "Link", "Optional, e.g. their LinkedIn or website.", false),
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Contact form",
          file: "content/contact.json",
          fields: [
            str("heading", "Heading"),
            str("emphasis", "Highlighted words", "Words from the heading shown in cyan. Must match exactly, or leave empty.", false),
            txt("intro", "Text under the heading"),
            strings("projectTypes", "Project types", "Options in the “What do you need?” dropdown."),
            txt("success", "Message after sending"),
            txt("notOpened", "Help text if WhatsApp didn't open"),
          ],
        },
      ],
    },
  ],
};

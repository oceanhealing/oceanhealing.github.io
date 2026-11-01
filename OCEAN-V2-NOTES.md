# Ocean V2 — first implementation

## What changed
- Added a working 60-second arrival practice in `grounding.js`. It has start, pause, continue, reset, progress, and completion states. It does not prescribe a breathing cadence, save personal reflections, or send data anywhere.
- Added responsive styling for the practice while preserving the existing cream, deep teal, and sea-glass palette.
- Added a skip-to-content link, basic Open Graph metadata, and a theme color on the homepage.
- Made the four homepage exploration cards real links.
- Improved small-screen navigation with a horizontally scrollable menu.
- Replaced placeholder `mailto:hello@yourdomain.com` destinations with the existing discovery-call page rather than inventing an email address.
- Updated stylesheet cache versions.

## Publish
Upload the contents of this folder to the root of the GitHub Pages repository, preserving the `media/` directory. `grounding.js` must sit beside `index.html`.

## Before publishing
- Test the discovery-call booking flow and confirm its destination is correct.
- Check all pages on a phone and keyboard-only navigation.
- Consider compressing the 20 MB homepage video; the video is set to `preload=none` so it does not download immediately.
- Confirm whether the current project should use a real contact email or keep all contact requests routed through the discovery-call page.

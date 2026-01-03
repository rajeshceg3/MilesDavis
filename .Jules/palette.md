## 2024-05-23 - Back to Top Accessibility
**Learning:** Long scrolling narratives with fixed navigational elements at the start require a mechanism to return to the top or navigate efficiently. A "Back to Top" button is a simple, unobtrusive solution that improves accessibility for keyboard and mouse users alike, especially when "Skip to Content" is implicitly handled by the layout but "return to start" is not.
**Action:** When designing long-form scrolling experiences, always include a way to reset the scroll position, ensuring it is keyboard accessible and respects reduced motion preferences where possible (though implemented with smooth scroll here, browser settings usually override).

## 2024-05-23 - Focus Visibility on Ghost Buttons
**Learning:** Buttons with minimal visual weight (ghost buttons) that rely on low opacity for aesthetics can become invisible to users with vision impairments and completely fail 2.4.7 Focus Visible requirements if `focus:outline-none` is used without a replacement.
**Action:** Always ensure ghost buttons have a strong `focus-visible` ring (e.g., `ring-2 ring-offset-2`) and sufficient text contrast (WCAG AA), even if it compromises the "faded" aesthetic slightly.

## 2026-01-03 - Focus Management on Scroll
**Learning:** Smooth scrolling buttons (like "Scroll to Listen") often leave keyboard focus at the trigger point, disorienting users who must then tab through the entire previous section again.
**Action:** Always move focus to the target container (using `tabIndex={-1}`) after a programmatic scroll action, ensuring the reading order follows the visual change.

## 2026-01-03 - Polite Animations
**Learning:** Continuous animations like `animate-pulse` catch attention but can become annoying or distracting (cognitive load) once the user has acknowledged them.
**Action:** Use `hover:animate-none` and `focus:animate-none` to stop attention-grabbing animations when the user interacts with the element.

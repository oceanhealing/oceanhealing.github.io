
document.addEventListener("DOMContentLoaded", function () {
  const header = document.createElement("header");
  header.className = "nav";

  header.innerHTML = `
    <a class="brand" href="index.html">OCEAN</a>

    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="index.html">Home</a></li>

        <li class="has-sub">
          <a href="about.html">Meet Ocean</a>
          <ul class="submenu">
            <li><a href="about.html#about">About</a></li>
            <li><a href="about.html#connect">Let's connect</a></li>
          </ul>
        </li>

        <li class="has-sub">
          <a href="healing.html">Healing &amp; Embodiment</a>
          <ul class="submenu">
            <li><a href="healing.html#invitation">An invitation</a></li>
            <li><a href="healing.html#expect">What to expect</a></li>
            <li><a href="healing.html#offerings">Ways to work together</a></li>
          </ul>
        </li>

        <li class="has-sub">
          <a href="consciousness.html">Consciousness</a>
          <ul class="submenu">
            <li><a href="consciousness.html#inquiry">The inquiry</a></li>
            <li><a href="consciousness.html#practices">Practices</a></li>
          </ul>
        </li>

        <li class="has-sub">
          <a href="psychedelics.html">Psychedelics &amp; Science</a>
          <ul class="submenu">
            <li><a href="psychedelics.html#why">Why I'm learning</a></li>
            <li><a href="psychedelics.html#integration">Integration</a></li>
            <li><a href="psychedelics.html#safety">Safety &amp; humility</a></li>
          </ul>
        </li>

        <li class="has-sub">
          <a href="relationship.html">Relational Intelligence</a>
          <ul class="submenu">
            <li><a href="relationship.html#presence">Presence</a></li>
            <li><a href="relationship.html#practices">Practices</a></li>
          </ul>
        </li>

        <li class="nav-cta">
          <a href="discovery-call.html">Discovery Call</a>
        </li>
      </ul>
    </nav>
  `;

  document.body.prepend(header);
});

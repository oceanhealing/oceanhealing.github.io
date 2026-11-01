
document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.getElementById("site-header");

  if (!placeholder) {
    console.error("Navigation placeholder #site-header not found.");
    return;
  }

  const header = document.createElement("header");
  header.className = "nav";

  header.innerHTML = `
    <a class="brand" href="index.html">OCEAN</a>

    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">Meet Ocean</a></li>
        <li><a href="healing.html">Healing &amp; Embodiment</a></li>
        <li><a href="consciousness.html">Consciousness</a></li>
        <li><a href="psychedelics.html">Psychedelics &amp; Science</a></li>
        <li><a href="relationship.html">Relational Intelligence</a></li>
        <li class="nav-cta"><a href="discovery-call.html">Free Discovery Call</a></li>
      </ul>
    </nav>
  `;

  placeholder.replaceWith(header);
});

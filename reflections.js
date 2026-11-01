
async function loadReflections() {
  const containers = document.querySelectorAll("[data-reflections]");

  for (const container of containers) {
    const topic = container.dataset.reflections;
    const limit = Number(container.dataset.limit || 3);

    try {
      const response = await fetch("reflections/index.json");
      if (!response.ok) throw new Error("Could not load reflection index");

      const filenames = await response.json();

      const reflections = await Promise.all(
        filenames.map(async (filename) => {
          const file = await fetch(`reflections/${filename}`);
          if (!file.ok) return null;

          const markdown = await file.text();
          const match = markdown.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

          if (!match) return null;

          const metadata = {};
          match[1].split("\n").forEach(line => {
            const item = line.match(/^([\w-]+):\s*(.*)$/);
            if (item) metadata[item[1]] = item[2].trim();
          });

          const topics = (metadata.topics || "")
            .replace(/[\[\]]/g, "")
            .split(",")
            .map(t => t.trim());

          return {
            ...metadata,
            topics,
            body: match[2],
            filename
          };
        })
      );

      const filtered = reflections
        .filter(post => post && post.topics.includes(topic))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);

      if (!filtered.length) {
        container.innerHTML =
          '<p class="sub-note">A space for what is unfolding. New reflections will find their way here.</p>';
        continue;
      }

      container.innerHTML = filtered.map(post => `
        <article class="journal-card">
          <p class="post-tag">${post.type || "REFLECTION"}</p>
          <h3>${post.title}</h3>
          <p>${post.summary || ""}</p>
          <a href="reflection.html?file=${encodeURIComponent(post.filename)}">
            Read reflection →
          </a>
        </article>
      `).join("");

    } catch (error) {
      console.error(error);
      container.innerHTML =
        '<p class="sub-note">Reflections are temporarily unavailable.</p>';
    }
  }
}

document.addEventListener("DOMContentLoaded", loadReflections);


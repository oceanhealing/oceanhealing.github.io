
async function loadReflections() {
  const containers = document.querySelectorAll(".journal-grid");

  for (const container of containers) {
    const category = container.dataset.reflections;
    const limit = Number(container.dataset.limit || 3);

    try {
      const response = await fetch("reflections/index.json");
      if (!response.ok) throw new Error("Could not load reflection index.");

      const files = await response.json();

      const reflections = await Promise.all(
        files.map(async (file) => {
          const result = await fetch(`reflections/${file}`);
          if (!result.ok) return null;

          const markdown = await result.text();
          const match = markdown.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

          if (!match) return null;

          const metadata = {};

          match[1].split("\n").forEach((line) => {
            const item = line.match(/^([\w-]+):\s*(.*)$/);
            if (item) {
              metadata[item[1]] = item[2].trim().replace(/^["']|["']$/g, "");
            }
          });

          return { ...metadata, file };
        })
      );

      const filtered = reflections
        .filter((post) => {
          if (!post || !post.title) return false;

          const topics = (post.topics || "")
            .replace(/[\[\]]/g, "")
            .split(",")
            .map((topic) => topic.trim());

          return !category || topics.includes(category);
        })
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, limit);

      container.replaceChildren();

      filtered.forEach((post) => {
        const card = document.createElement("article");
        card.className = "journal-card";

        const link = document.createElement("a");
        link.className = "journal-card-link";
        link.href = `reflection.html?file=${encodeURIComponent(post.file)}`;

        const imageWrap = document.createElement("div");
        imageWrap.className = "journal-card-image";

        if (post.image) {
          const img = document.createElement("img");
          img.src = post.image;
          img.alt = post.title;
          img.loading = "lazy";
          imageWrap.appendChild(img);
        } else {
          imageWrap.classList.add("journal-image-placeholder");
        }

        const content = document.createElement("div");
        content.className = "journal-card-content";

        const title = document.createElement("h3");
        title.textContent = post.title;

        const summary = document.createElement("p");
        summary.textContent = post.summary || "";

        const readMore = document.createElement("span");
        readMore.className = "journal-read-more";
        readMore.textContent = "Read reflection →";

        content.append(title, summary, readMore);
        link.append(imageWrap, content);
        card.appendChild(link);
        container.appendChild(card);
      });

    } catch (error) {
      console.error("Reflections could not be loaded:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadReflections);

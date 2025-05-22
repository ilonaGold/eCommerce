export function ensureRoot(id = "root"): HTMLElement {
  let root = document.getElementById(id);

  if (!root) {
    root = document.createElement("div");
    root.id = id;
    document.body.appendChild(root);
  }

  root.innerHTML = "";
  return root;
}

workflow "Build and deploy on push" {
  on = "push"
  resolves = ["GitHub Action for npm", "docker://node"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "docker://node" {
  uses = "docker://node"
  runs = "npm"
  args = "install"
}

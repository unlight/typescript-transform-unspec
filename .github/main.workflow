workflow "Main" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  runs = "npm"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  runs = "npm"
  args = "test"
}

action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  runs = "npm"
  args = "run build"
}

# Filter for master branch
action "Master" {
  needs = ["Test", "Build"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish" {
  needs = "Master"
  uses = "actions/npm@master"
  runs = "npx"
  args = "semantic-release"
  secrets = ["NPM_TOKEN", "GITHUB_TOKEN"]
}

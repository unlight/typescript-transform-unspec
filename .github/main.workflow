workflow "Main Workflow" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "test"
}

action "Build" {
  needs = "Test"
  uses = "actions/npm@master"
  args = "test"
}

# Filter for master branch
action "Master" {
  needs = "Build"
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

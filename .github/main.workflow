workflow "Main" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "docker://node"
  runs = "npm"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "docker://node"
  runs = "npm"
  args = "test"
}

action "Pre Build" {
  needs = "Install"
  uses = "docker://stedolan/jq"
  runs = "sh"
  args = "Taskfile prebuild"
}

action "Build" {
  needs = "Pre Build"
  uses = "docker://node"
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
  uses = "docker://node"
  runs = "npx"
  args = "semantic-release"
  secrets = ["NPM_TOKEN", "GITHUB_TOKEN"]
}

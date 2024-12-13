module.exports = {
    branch: ['main', {name: "next", prerelease: true}],
    plugin: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/github"
    ]
}
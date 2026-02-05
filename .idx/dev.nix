{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.docker
    pkgs.docker-compose
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
    "Anthropic.claude-code"
    "eamodio.gitlens"
    "ms-vscode.js-debug"
    "ms-vscode.powershell"
    "msjsdiag.vscode-react-native"
    "redhat.java"
    "redhat.vscode-yaml"
    "vscjava.vscode-gradle"
    "vscjava.vscode-java-debug"
    "vscjava.vscode-java-dependency"
    "vscjava.vscode-java-pack"
    "vscjava.vscode-java-test"
    "vscjava.vscode-maven"
    "WSO2.apk-config-language-support"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
  idx.services.docker.enable = true;
}
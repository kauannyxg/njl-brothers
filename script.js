
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const quoteForm = document.getElementById("quoteForm");

// Número de WhatsApp da NJL Brothers
const WHATSAPP_NUMERO = "5511993950638";

// Atualiza o ano automaticamente
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Abre e fecha o menu em telas pequenas
if (menuToggle && menu) {
  menuToggle.addEventListener("click", function () {
    const aberto = menu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
      "aria-label",
      aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = aberto ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });
}

// Formulário de orçamento
if (quoteForm) {
  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const area = document.getElementById("area").value;
    const observacoes =
      document.getElementById("observacoes").value.trim();

    const selecionados = Array.from(
      document.querySelectorAll('input[name="servicos"]:checked')
    ).map(function (item) {
      return item.value;
    });

    if (selecionados.length === 0) {
      alert("Selecione pelo menos um serviço desejado.");
      return;
    }

    const mensagem = [
      "Olá! Gostaria de solicitar um orçamento com a NJL Brothers.",
      "",
      "DADOS DO CLIENTE",
      "Nome: " + nome,
      "WhatsApp: " + telefone,
      "Cidade da obra: " + cidade,
      "Área aproximada: " +
        (area ? area + " m²" : "Ainda não informada"),
      "",
      "SERVIÇOS DESEJADOS",
      selecionados.map(function (servico) {
        return "- " + servico;
      }).join("\n"),
      "",
      "OBSERVAÇÕES",
      observacoes || "Nenhuma observação informada.",
      "",
      "Gostaria de conversar sobre as condições e receber o orçamento final."
    ].join("\n");

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMERO +
      "?text=" +
      encodeURIComponent(mensagem);

    window.open(url, "_blank");
  });
}

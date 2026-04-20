const nodemailer = require("nodemailer");

function cleanInput(value) {
  return String(value || "").trim();
}

async function getRequestBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  const contentType = req.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(raw || "{}");
    } catch (_error) {
      return {};
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(raw);
    return Object.fromEntries(params.entries());
  }

  return {};
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const body = await getRequestBody(req);

    const fullName = cleanInput(body.fullName);
    const phone = cleanInput(body.phone);
    const company = cleanInput(body.company);
    const serviceType = cleanInput(body.serviceType);
    const message = cleanInput(body.message);

    if (!fullName || !phone || !serviceType) {
      return res.status(422).send("Formulaire invalide.");
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL || "jeremie.nabett@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser || toEmail;

    if (!smtpHost || !smtpUser || !smtpPass) {
      const missing = [];
      if (!smtpHost) missing.push("SMTP_HOST");
      if (!smtpUser) missing.push("SMTP_USER");
      if (!smtpPass) missing.push("SMTP_PASS");
      return res
        .status(500)
        .send(`Configuration SMTP manquante sur Vercel: ${missing.join(", ")}`);
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const text = [
      "Nouvelle demande via le portfolio de Jérémie Nabet",
      "",
      `Nom complet: ${fullName}`,
      `Téléphone: ${phone}`,
      `Entreprise: ${company || "-"}`,
      `Type de service: ${serviceType}`,
      "Message:",
      message || "-",
    ].join("\n");

    await transporter.sendMail({
      from: `Portfolio Jérémie Nabet <${fromEmail}>`,
      to: toEmail,
      subject: "Nouvelle demande de projet - Portfolio",
      text,
    });

    return res.status(200).send("Merci, votre demande a bien été envoyée.");
  } catch (_error) {
    return res.status(500).send("Erreur serveur pendant l'envoi.");
  }
};

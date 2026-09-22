import type { Locale } from "@/lib/i18n";

export type Dictionary = {
  nav: string[];
  hero: {
    basedIn: string;
    timezone: string;
    work: string;
    languages: string;
    remote: string;
    languagesValue: string;
    seeWork: string;
    getInTouch: string;
    details: string;
  };
  sections: {
    workEyebrow: string;
    workTitle: string;
    approachEyebrow: string;
    approachTitle: string;
    skills: string;
    experienceEyebrow: string;
    experienceTitle: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    contactEyebrow: string;
    contactTitle: string;
    contactIntro: string;
  };
  contact: {
    email: string;
    phone: string;
    elsewhere: string;
    shortCall: string;
    shortCallIntro: string;
    requestCall: string;
    bookCall: string;
    sending: string;
    thanks: string;
    invalidEmail: string;
    messageSent: string;
    reply: string;
    sendAnother: string;
    name: string;
    company: string;
    need: string;
    engagements: string[];
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
    inbox: string;
    validationName: string;
    validationEmail: string;
    validationMessage: string;
    linkedinProfile: string;
    githubProfile: string;
  };
  footer: { language: string };
};

const english: Dictionary = {
  nav: ["Case studies", "Process", "Experience", "Services", "Contact"],
  hero: {
    basedIn: "Based in",
    timezone: "Time zone",
    work: "Work",
    languages: "Spoken languages",
    remote: "Remote",
    languagesValue: "English, Urdu",
    seeWork: "View case studies",
    getInTouch: "Book a discovery call",
    details: "Details",
  },
  sections: {
    workEyebrow: "Selected work",
    workTitle: "AI products, automation workflows, and SaaS systems built around real business data.",
    approachEyebrow: "How I work",
    approachTitle: "Three habits behind every reliable product I ship.",
    skills: "Skills",
    experienceEyebrow: "Experience",
    experienceTitle: "From product execution to AI-driven product design.",
    servicesEyebrow: "Services",
    servicesTitle: "What I can help you build.",
    servicesIntro: "I work with startups, product teams, and businesses that need a clear technical partner to design, build, and ship useful digital systems.",
    contactEyebrow: "Contact",
    contactTitle: "Tell me what you need to build.",
    contactIntro: "Share a short brief about the problem, the product, and the timeline. I read every message and reply with a practical next step.",
  },
  contact: {
    email: "Email",
    phone: "Phone",
    elsewhere: "Elsewhere",
    shortCall: "Prefer a short call?",
    shortCallIntro: "Leave your email and I will suggest times for a 15-minute intro.",
    requestCall: "Request a call",
    bookCall: "Book a call",
    sending: "Sending",
    thanks: "Thanks. I will email you with times.",
    invalidEmail: "Please enter a valid email and try again.",
    messageSent: "Message sent.",
    reply: "Thanks. I will reply by email. If you do not hear back, write to",
    sendAnother: "Send another message",
    name: "Name",
    company: "Company (optional)",
    need: "What do you need?",
    engagements: [
      "Build a product or MVP",
      "Add AI to an existing product",
      "Fix, stabilize, or take over an existing codebase",
      "Improve speed, uptime, or scale",
      "Not sure yet",
    ],
    message: "Message",
    messagePlaceholder: "What are you building, and when do you need it?",
    sendMessage: "Send message",
    inbox: "Goes straight to my inbox.",
    validationName: "Please enter your name.",
    validationEmail: "Please enter a valid email address.",
    validationMessage: "Please write at least 20 characters.",
    linkedinProfile: "LinkedIn profile",
    githubProfile: "GitHub profile",
  },
  footer: { language: "Language" },
};

const french: Dictionary = {
  ...english,
  nav: ["Projets", "Ma méthode", "Expérience", "Services", "Contact"],
  hero: { ...english.hero, basedIn: "Basé à", timezone: "Fuseau horaire", work: "Format de travail", languages: "Langues parlées", remote: "À distance", languagesValue: "Anglais, ourdou", seeWork: "Voir mes projets", getInTouch: "Me contacter", details: "Détails" },
  sections: { ...english.sections, workEyebrow: "Projets sélectionnés", workTitle: "Des produits où l’interface, l’API et l’IA partagent une même source de données.", approachEyebrow: "Ma méthode", approachTitle: "Trois habitudes présentes dans chaque projet.", skills: "Compétences", experienceEyebrow: "Expérience", experienceTitle: "De stagiaire React à la création de produits IA.", servicesEyebrow: "Services", servicesTitle: "Ce que je peux faire pour vous.", servicesIntro: "Je travaille en freelance ou en contrat avec des startups, des équipes produit et des entreprises en croissance. Décrivez votre besoin et je proposerai un plan concret.", contactEyebrow: "Contact", contactTitle: "Parlez-moi de votre projet.", contactIntro: "Envoyez quelques mots sur votre projet et vos délais. Je lis chaque message et réponds par e-mail." },
  contact: { ...english.contact, email: "E-mail", phone: "Téléphone", elsewhere: "En ligne", shortCall: "Vous préférez un appel court ?", shortCallIntro: "Laissez votre e-mail et je proposerai des créneaux pour un appel de 15 minutes.", requestCall: "Demander un appel", bookCall: "Planifier un appel", sending: "Envoi", thanks: "Merci. Je vous enverrai des créneaux par e-mail.", invalidEmail: "Saisissez un e-mail valide puis réessayez.", messageSent: "Message envoyé.", reply: "Merci. Je répondrai par e-mail. Sans réponse, écrivez à", sendAnother: "Envoyer un autre message", name: "Nom", company: "Entreprise (facultatif)", need: "De quoi avez-vous besoin ?", engagements: ["Créer un produit ou un MVP", "Ajouter l’IA à un produit existant", "Corriger, stabiliser ou reprendre une base de code existante", "Améliorer la vitesse, la disponibilité ou l’échelle", "Je ne suis pas encore sûr"], message: "Message", messagePlaceholder: "Que construisez-vous et pour quand ?", sendMessage: "Envoyer le message", inbox: "Le message arrive directement dans ma boîte.", validationName: "Saisissez votre nom.", validationEmail: "Saisissez une adresse e-mail valide.", validationMessage: "Écrivez au moins 20 caractères.", linkedinProfile: "Profil LinkedIn", githubProfile: "Profil GitHub" },
  footer: { language: "Langue" },
};

const russian: Dictionary = {
  ...english,
  nav: ["Проекты", "Как я работаю", "Опыт", "Услуги", "Контакты"],
  hero: { ...english.hero, basedIn: "Местоположение", timezone: "Часовой пояс", work: "Формат работы", languages: "Языки общения", remote: "Удалённо", languagesValue: "Английский, урду", seeWork: "Посмотреть проекты", getInTouch: "Связаться", details: "Детали" },
  sections: { ...english.sections, workEyebrow: "Избранные проекты", workTitle: "Продукты, где интерфейс, API и ИИ работают с одним источником данных.", approachEyebrow: "Как я работаю", approachTitle: "Три принципа, которые есть в каждом проекте.", skills: "Навыки", experienceEyebrow: "Опыт", experienceTitle: "От стажёра React до создания продуктов с ИИ.", servicesEyebrow: "Услуги", servicesTitle: "Чем я могу помочь.", servicesIntro: "Я работаю на фрилансе и по контракту со стартапами, продуктовыми командами и растущими компаниями. Расскажите о задаче, и я предложу практичный план.", contactEyebrow: "Контакты", contactTitle: "Расскажите о вашем проекте.", contactIntro: "Напишите, что вы создаёте и какие сроки важны. Я читаю каждое сообщение и отвечаю по e-mail." },
  contact: { ...english.contact, email: "E-mail", phone: "Телефон", elsewhere: "Ссылки", shortCall: "Предпочитаете короткий звонок?", shortCallIntro: "Оставьте e-mail, и я предложу время для 15-минутного знакомства.", requestCall: "Запросить звонок", bookCall: "Запланировать звонок", sending: "Отправка", thanks: "Спасибо. Я пришлю время по e-mail.", invalidEmail: "Введите корректный e-mail и повторите попытку.", messageSent: "Сообщение отправлено.", reply: "Спасибо. Я отвечу по e-mail. Если ответа нет, напишите на", sendAnother: "Отправить ещё сообщение", name: "Имя", company: "Компания (необязательно)", need: "Что вам нужно?", engagements: ["Создать продукт или MVP", "Добавить ИИ в существующий продукт", "Исправить, стабилизировать или принять существующий код", "Улучшить скорость, uptime или масштабируемость", "Пока не уверен"], message: "Сообщение", messagePlaceholder: "Что вы создаёте и когда нужен результат?", sendMessage: "Отправить сообщение", inbox: "Сообщение попадёт прямо в мой почтовый ящик.", validationName: "Введите имя.", validationEmail: "Введите корректный e-mail.", validationMessage: "Напишите не менее 20 символов.", linkedinProfile: "Профиль LinkedIn", githubProfile: "Профиль GitHub" },
  footer: { language: "Язык" },
};

export function getDictionary(locale: Locale): Dictionary {
  return locale === "fr" ? french : locale === "ru" ? russian : english;
}

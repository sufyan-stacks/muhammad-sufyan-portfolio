import {
  education as englishEducation,
  experience as englishExperience,
  metrics as englishMetrics,
  person,
  principles as englishPrinciples,
  services as englishServices,
  skillGroups as englishSkillGroups,
  stack as englishStack,
  work as englishWork,
} from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export type LocalizedContent = {
  person: { title: string; headline: string };
  metrics: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  stack: readonly string[];
  work: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly period: string;
    readonly role: string;
    readonly client: string;
    readonly tagline: string;
    readonly image: string;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly imageAlt: string;
    readonly challenge: string;
    readonly contribution: string;
    readonly outcomes: readonly string[];
    readonly tech: readonly string[];
  }>;
  principles: ReadonlyArray<{ readonly title: string; readonly body: string }>;
  skillGroups: ReadonlyArray<{ readonly name: string; readonly items: readonly string[] }>;
  experience: ReadonlyArray<{
    readonly role: string;
    readonly org?: string;
    readonly place: string;
    readonly points: readonly string[];
    readonly dates?: string;
  }>;
  education: ReadonlyArray<{ readonly name: string; readonly org: string; readonly dates: string }>;
  services: ReadonlyArray<{
    readonly name: string;
    readonly audience: string;
    readonly includes: readonly string[];
    readonly cta: string;
  }>;
};

const english: LocalizedContent = {
  person: { title: person.title, headline: person.headline },
  metrics: englishMetrics,
  stack: englishStack,
  work: englishWork,
  principles: englishPrinciples,
  skillGroups: englishSkillGroups,
  experience: englishExperience,
  education: englishEducation,
  services: englishServices,
};

const french: LocalizedContent = {
  person: {
    title: "Ingénieur Full-Stack SaaS IA | React · Node · Next.js | Automatisation IA, LLM, RAG",
    headline: "J'aide les startups, les équipes produit et les entreprises en croissance à livrer des produits SaaS, e-commerce et des fonctionnalités IA fiables.",
  },
  metrics: [
    { value: "4+", label: "ans de création de produits SaaS et e-commerce" },
    { value: "1k+", label: "requêtes par minute en production" },
    { value: "<150 ms", label: "latence API p95" },
    { value: "99,95 %", label: "disponibilité à grande échelle" },
  ],
  stack: englishStack,
  work: [
    { ...englishWork[0], role: "Développeur full-stack", client: "Entreprise financière en Serbie", imageAlt: "Tableau de bord de gestion des risques avec carte thermique et actifs connectés.", tagline: "Les risques et la conformité dans un seul système.", challenge: "L'entreprise suivait ses actifs, fournisseurs, contrats, risques et preuves dans plusieurs feuilles de calcul. Les responsables ne voyaient pas les décisions à prendre.", contribution: "La plateforme cartographie les dépendances entre applications, serveurs et fournisseurs et évalue les risques. Les contrôles ISO 27001, DORA et GDPR deviennent des exigences suivies avec validation. Les tâches récurrentes, rappels, rapports et calendriers sont automatisés.", outcomes: ["Architecture multi-tenant avec historique complet", "Planification du travail selon les disponibilités", "Registres configurables sans développeur"] },
    { ...englishWork[1], role: "Développeur full-stack et intégration IA", client: "Boutique e-commerce", imageAlt: "Boutique e-commerce et assistant répondant à une question sur les produits laitiers.", tagline: "Un assistant qui répond à partir du vrai catalogue.", challenge: "Un chatbot générique peut inventer les prix et les stocks. Cette boutique avait besoin de réponses fiables.", contribution: "J'ai créé la boutique, le parcours de commande et le tableau de bord d'administration. L'assistant recherche dans le catalogue en direct avant de répondre, avec saisie vocale ou textuelle.", outcomes: ["Réponses rapides sur le catalogue et la livraison", "Prix et stocks issus des données réelles", "Recherche vocale et textuelle unifiée"] },
    { ...englishWork[2], role: "Développeur SaaS full-stack", client: "Plateforme de conformité et RH pour la logistique", imageAlt: "Tableau de bord CDLC Manager avec conformité MCS-150, employés, formations et enquêtes de satisfaction.", tagline: "Conformité, formation et engagement des employés dans un seul tableau de bord.", challenge: "Une entreprise de logistique avait besoin d'un espace unique pour suivre les déclarations FMCSA, les formations, la reconnaissance entre collègues et le bien-être des équipes.", contribution: "J'ai créé une plateforme SaaS qui réunit le suivi MCS-150 et DOT, les dossiers employés, un éditeur de formations par glisser-déposer, la reconnaissance entre pairs et des enquêtes anonymes.", outcomes: ["Échéances et documents de conformité réunis", "Plans de formation créés à partir de modules réutilisables", "Engagement mesuré sans exposer les réponses individuelles"] },
    { ...englishWork[3], role: "Développeur full-stack", client: "Marque de commerce local", imageAlt: "DamnDeal sur ordinateur, tablette et téléphone : la boutique, le parcours des coupons et la livraison en 10 minutes depuis les magasins proches.", tagline: "Achats, livraison en 10 minutes et coupons QR sur une seule plateforme.", challenge: "DamnDeal voulait réunir les achats en ligne, la livraison locale en 10 minutes et les coupons locaux sous une seule marque.", contribution: "J'ai créé une plateforme unique avec quatre portails : client, vendeur, administrateur et apporteur d'affaires. Le client récupère un coupon et reçoit un QR code unique. Le commerce le valide une seule fois, au comptoir ou depuis son propre site via une API.", outcomes: ["Chaque QR code n'est validé qu'une fois, un coupon ne peut donc être ni réutilisé ni falsifié", "Les apporteurs d'affaires recrutent de nouveaux commerces grâce à des codes de parrainage", "En production sur damndeal.com"] },
  ],
  principles: [
    { title: "Répondre avec les vraies données", body: "Mes assistants consultent d'abord le catalogue ou le registre en direct, puis répondent avec des garde-fous." },
    { title: "Un seul endroit pour les données", body: "Les feuilles de calcul et les boîtes mail deviennent un système unique avec un historique vérifiable." },
    { title: "La vitesse fait partie du produit", body: "J'utilise le cache Redis, l'optimisation SQL et les files de tâches pour réduire la latence et maintenir la disponibilité." },
  ],
  skillGroups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Redux Toolkit"] },
    { name: "Backend", items: ["Node.js", "NestJS", "Express", "Python", "REST", "GraphQL", "microservices"] },
    { name: "IA", items: ["RAG", "LangChain", "OpenAI API", "embeddings", "recherche vectorielle", "garde-fous"] },
    { name: "Données", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "modélisation", "optimisation SQL"] },
    { name: "Messagerie et temps réel", items: ["RabbitMQ", "Kafka", "BullMQ", "Socket.io", "webhooks"] },
    { name: "Cloud et livraison", items: ["Docker", "AWS", "Nginx", "GitHub Actions", "Linux"] },
  ],
  experience: [
    { ...englishExperience[0], role: "Ingénieur Full-Stack AI SaaS", org: "Indépendant / Contrat", place: "À distance", points: ["Création d'une plateforme multi-tenant de gestion des actifs, fournisseurs, contrats, risques et preuves.", "Automatisation des contrôles, rappels, rapports et synchronisations de calendriers.", "Livraison d'une boutique avec assistant IA qui consulte le catalogue avant de répondre."] },
    { ...englishExperience[1], role: "Ingénieur logiciel full-stack", place: "Lahore, Pakistan", points: ["Conception d'API REST pour plus de 1 000 requêtes par minute avec une latence p95 inférieure à 150 ms.", "Ajout du cache Redis et optimisation des requêtes, avec une baisse de latence de 35 %.", "Conteneurisation Docker et CI/CD GitHub Actions pour réduire les échecs de déploiement."] },
    { ...englishExperience[2], role: "Développeur MERN", place: "Faisalabad, Pakistan", points: ["Évolution de stagiaire React à développeur MERN senior en deux ans.", "Création de plateformes e-commerce avec Shopify, Stripe et PayPal.", "Accompagnement de trois développeurs juniors et gestion des projets jusqu'à la production."] },
  ],
  education: [
    { ...englishEducation[0], name: "Diplôme associé en conception et développement web", org: "Virtual University of Pakistan" },
    { ...englishEducation[1], name: "M320 : modélisation des données MongoDB", org: "MongoDB University" },
    { ...englishEducation[2], name: "Développeur MERN Stack", org: "American Skills Evaluation Institute" },
  ],
  services: [
    { ...englishServices[0], name: "Nouveau produit", audience: "Vous avez une idée ou un processus encore géré dans des feuilles de calcul.", includes: ["Modèle de données, API et interface avec Next.js, Node.js et PostgreSQL", "Multi-tenant, rôles et historique d'audit", "Tâches en arrière-plan et intégrations calendrier/e-mail", "Docker, CI/CD et déploiement"], cta: "Préparer un projet" },
    { ...englishServices[1], name: "Assistants IA et automatisation", audience: "Vous voulez un assistant, un chatbot ou un workflow connecté à vos vraies données.", includes: ["Intégration RAG et LLM pour catalogues, documents et bases de connaissances", "Automatisation avec function calling, webhooks et règles métier", "Saisie vocale et textuelle", "Garde-fous et contrôle des accès"], cta: "Planifier une fonctionnalité IA" },
    { ...englishServices[2], name: "Vitesse et fiabilité", audience: "Votre API est lente ou vos mises en production cassent des fonctionnalités.", includes: ["Cache Redis et optimisation des requêtes", "Objectifs de latence mesurés en p95", "Pipelines Docker et GitHub Actions", "Hébergement AWS derrière Nginx"], cta: "Améliorer la fiabilité" },
  ],
};

const russian: LocalizedContent = {
  ...english,
  person: { title: "Full-Stack SaaS AI инженер | React · Node · Next.js | AI-автоматизация, LLM, RAG", headline: "Я помогаю стартапам, продуктовым командам и растущим компаниям создавать AI-ассистентов, автоматизацию процессов и надёжные SaaS-продукты." },
  metrics: [
    { value: "4+", label: "года создания SaaS и e-commerce продуктов" },
    { value: "1k+", label: "запросов в минуту в production" },
    { value: "<150 мс", label: "задержка API p95" },
    { value: "99,95%", label: "доступность при росте нагрузки" },
  ],
  work: englishWork.map((item, index) => index === 0 ? { ...item, role: "Full-stack разработчик", client: "Финансовая компания в Сербии", imageAlt: "Панель управления рисками с тепловой картой и связанными активами.", tagline: "Риски и соответствие требованиям в одной системе.", challenge: "Компания отслеживала активы, поставщиков, договоры, риски и доказательства в разных таблицах. Руководителям было сложно видеть решения.", contribution: "Платформа показывает зависимости между приложениями, серверами и поставщиками и оценивает риски. Требования ISO 27001, DORA и GDPR превращаются в контролируемые задачи с согласованием.", outcomes: ["Multi-tenant архитектура с полной историей изменений", "Планирование работы с учётом свободного времени", "Настраиваемые реестры без участия разработчика"] } : index === 1 ? { ...item, role: "Full-stack разработчик и AI-интегратор", client: "E-commerce магазин", imageAlt: "Витрина магазина и ассистент, отвечающий на вопрос о молочных продуктах.", tagline: "Ассистент, который отвечает по реальному каталогу.", challenge: "Обычный чат-бот может придумать цену или наличие. Магазину нужны были ответы, которым можно доверять.", contribution: "Я создал витрину, оформление заказа и административную панель. Ассистент проверяет актуальный каталог перед ответом и поддерживает голосовой и текстовый ввод.", outcomes: ["Быстрые ответы о товарах и доставке", "Цены и остатки берутся из реальных данных", "Единый поиск для голоса и текста"] } : index === 2 ? { ...item, role: "Full-stack SaaS разработчик", client: "Платформа соответствия и HR для логистики", imageAlt: "Панель CDLC Manager с соответствием MCS-150, сотрудниками, обучением и опросами удовлетворённости.", tagline: "Соответствие требованиям, обучение и вовлечённость сотрудников в одной панели.", challenge: "Логистической компании нужен единый рабочий интерфейс для FMCSA-документов, обучения, признания коллег и благополучия команды.", contribution: "Я создал SaaS-платформу с отслеживанием MCS-150 и DOT, профилями сотрудников, конструктором обучения, признанием коллег и анонимными опросами.", outcomes: ["Сроки и документы соответствия в одном месте", "Учебные планы из переиспользуемых модулей", "Измерение вовлечённости без раскрытия ответов"] } : index === 3 ? { ...item, role: "Full-stack разработчик", client: "Бренд локальной торговли", imageAlt: "DamnDeal на ноутбуке, планшете и телефоне: витрина, получение купона и доставка за 10 минут из ближайших магазинов.", tagline: "Покупки, доставка за 10 минут и QR-купоны на одной платформе.", challenge: "DamnDeal хотел объединить онлайн-покупки, локальную доставку за 10 минут и местные купоны под одним брендом.", contribution: "Я создал единую платформу с четырьмя порталами: для покупателей, продавцов, администраторов и бизнес-партнёров. Покупатель получает купон с уникальным QR-кодом. Бизнес подтверждает его один раз, на кассе или на своём сайте через API.", outcomes: ["Каждый QR-код подтверждается только один раз, поэтому купон нельзя использовать повторно или подделать", "Партнёры привлекают новый бизнес по реферальным кодам", "Работает в продакшене на damndeal.com"] } : item),
  principles: [
    { title: "Отвечать по реальным данным", body: "Мои ассистенты сначала проверяют актуальный каталог или реестр, а затем отвечают с ограничениями безопасности." },
    { title: "Единый источник данных", body: "Таблицы и переписки превращаются в единую систему с понятной историей изменений." },
    { title: "Скорость это часть продукта", body: "Redis, оптимизация запросов и очереди снижают задержку и помогают сохранять стабильность." },
  ],
  skillGroups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Redux Toolkit"] },
    { name: "Backend", items: ["Node.js", "NestJS", "Express", "Python", "REST", "GraphQL", "микросервисы"] },
    { name: "ИИ", items: ["RAG", "LangChain", "OpenAI API", "embeddings", "vector search", "ограничения безопасности"] },
    { name: "Данные", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "проектирование схем", "оптимизация запросов"] },
    { name: "Сообщения и real-time", items: ["RabbitMQ", "Kafka", "BullMQ", "Socket.io", "webhooks"] },
    { name: "Cloud и доставка", items: ["Docker", "AWS", "Nginx", "GitHub Actions", "Linux"] },
  ],
  experience: englishExperience.map((job, index) => ({ ...job, role: index === 0 ? "Full-Stack AI SaaS инженер" : index === 1 ? "Full-Stack software инженер" : "MERN Stack разработчик", place: index === 0 ? "Удалённо" : job.place, points: index === 0 ? ["Создал multi-tenant платформу для активов, поставщиков, договоров, рисков и доказательств.", "Автоматизировал проверки, напоминания, отчёты и синхронизацию календарей.", "Запустил магазин с AI-ассистентом, который проверяет актуальный каталог."] : index === 1 ? ["Спроектировал REST API для 1 000+ запросов в минуту с p95 менее 150 мс.", "Добавил Redis и оптимизировал запросы, снизив задержку сервера на 35%.", "Настроил Docker и GitHub Actions CI/CD, сократив количество ошибок деплоя."] : ["Вырос от React-стажёра до senior MERN разработчика за два года.", "Создавал e-commerce платформы с Shopify, Stripe и PayPal.", "Наставлял трёх junior разработчиков и вёл проекты до production."] })),
  education: [
    { ...englishEducation[0], name: "Свидетельство по веб-дизайну и разработке", org: "Virtual University of Pakistan" },
    { ...englishEducation[1], name: "M320: моделирование данных MongoDB", org: "MongoDB University" },
    { ...englishEducation[2], name: "MERN Stack разработчик", org: "American Skills Evaluation Institute" },
  ],
  services: [
    { ...englishServices[0], name: "Новый продукт", audience: "У вас есть идея или процесс, который всё ещё живёт в таблицах.", includes: ["Модель данных, API и интерфейс на Next.js, Node.js и PostgreSQL", "Multi-tenant, роли и история аудита", "Фоновые задачи и интеграции календаря и почты", "Docker, CI/CD и деплой"], cta: "Обсудить продукт" },
    { ...englishServices[1], name: "AI-ассистенты и автоматизация", audience: "Вам нужен ассистент, чат-бот или workflow, работающий с реальными бизнес-данными.", includes: ["RAG и LLM-интеграция для каталогов, документов и баз знаний", "Автоматизация с function calling, webhooks и бизнес-правилами", "Голосовой и текстовый ввод", "Ограничения безопасности и контроль доступа"], cta: "Спланировать AI-функцию" },
    { ...englishServices[2], name: "Скорость и надёжность", audience: "API работает медленно или релизы регулярно ломают функции.", includes: ["Redis и оптимизация запросов базы данных", "Цели задержки, измеренные по p95", "Docker и GitHub Actions", "AWS за Nginx"], cta: "Улучшить надёжность" },
  ],
};

export function getContent(locale: Locale): LocalizedContent {
  return locale === "fr" ? french : locale === "ru" ? russian : english;
}

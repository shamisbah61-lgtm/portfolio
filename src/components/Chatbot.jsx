import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FaRobot, 
  FaPaperPlane, 
  FaTimes, 
  FaTrash, 
  FaComments, 
  FaUserAstronaut,
  FaChevronDown,
  FaGlobe,
  FaVolumeUp,
  FaVolumeMute,
  FaFemale,
  FaMale
} from "react-icons/fa"

const WELCOME_MESSAGE = {
  en: "Greetings, human! 🛸 I am Cosmo, Misbah's holographic AI assistant. I'm here to help you navigate his galaxy. What would you like to explore?",
  mgl: "Hi explorer! 🛸 Njan Cosmo, Misbahinte holographic AI assistant aanu. Misbahine patti enthaanu ariyeendath?",
  ml: "ഹലോ കൂട്ടുകാരാ! 🛸 ഞാൻ കോസ്മോ, മിസ്ബാഹിന്റെ ഹോലോഗ്രാഫിക് അസിസ്റ്റന്റ് ആണ്. നിങ്ങൾക്ക് മിസ്ബാഹിനെക്കുറിച്ച് എന്താണ് അറിയേണ്ടത്?",
  ar: "مرحباً أيها المستكشف! 🛸 أنا كوزمو، مساعد مصباح الهولوغرافي الذكي. أنا هنا لمساعدتك في استكشاف كوكبه الخاص. ماذا ترغب في معرفته؟",
  es: "¡Saludos, humano! 🛸 Soy Cosmo, el asistente holográfico de Misbah. Estoy aquí para ayudarte a explorar su galaxia. ¿Qué te gustaría descubrir?"
};

const SUGGESTIONS = {
  en: [
    { text: "🚀 Projects & Work", query: "projects" },
    { text: "💻 Tech Stack & Skills", query: "skills" },
    { text: "📞 How to Contact", query: "contact" },
    { text: "🛸 About Misbah", query: "about" },
    { text: "👾 Space Trivia", query: "trivia" }
  ],
  mgl: [
    { text: "🚀 Projects", query: "projects" },
    { text: "💻 Core Skills", query: "skills" },
    { text: "📞 Contact Info", query: "contact" },
    { text: "🛸 About Me", query: "about" },
    { text: "👾 Space Trivia", query: "trivia" }
  ],
  ml: [
    { text: "🚀 പ്രൊജക്ടുകൾ", query: "projects" },
    { text: "💻 കഴിവുകൾ", query: "skills" },
    { text: "📞 കോൺടാക്റ്റ്", query: "contact" },
    { text: "🛸 എന്നെക്കുറിച്ച്", query: "about" },
    { text: "👾 ബഹിരാകാശം", query: "trivia" }
  ],
  ar: [
    { text: "🚀 المشاريع", query: "projects" },
    { text: "💻 المهارات", query: "skills" },
    { text: "📞 التواصل", query: "contact" },
    { text: "🛸 من أنا", query: "about" },
    { text: "👾 معلومات الفضاء", query: "trivia" }
  ],
  es: [
    { text: "🚀 Proyectos", query: "projects" },
    { text: "💻 Habilidades", query: "skills" },
    { text: "📞 Contacto", query: "contact" },
    { text: "🛸 Sobre mí", query: "about" },
    { text: "👾 Trivia", query: "trivia" }
  ]
};

const PLACEHOLDERS = {
  en: "Ask about projects, stack, contact...",
  mgl: "Ask about projects, skills, contact...",
  ml: "പ്രൊജക്റ്റുകൾ, കഴിവുകൾ ചോദിക്കൂ...",
  ar: "اسأل عن المشاريع، المهارات، التواصل...",
  es: "Pregunta sobre proyectos, habilidades..."
};

const BOT_DATA = {
  en: {
    projects: "Here are some of Misbah's featured projects:\n\n• **Turf Booking System:** A full-stack slot-booking app with authentication.\n• **Hotline Solution:** A premium travel booking platform featuring custom holiday packages.\n• **Django API Project:** A robust REST backend built with PostgreSQL.\n• **This Portfolio:** A fully immersive responsive website with galaxy effects and 3D orbit controls.\n\nClick below to go to the Projects section!",
    skills: "Misbah is a versatile developer! His core tech stack includes:\n\n• **Frontend:** React, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3\n• **Backend:** Django, Python\n• **Databases:** PostgreSQL, SQLite\n• **Animations:** Framer Motion, GSAP, Three.js / React Three Fiber\n\nWould you like to see some of his projects?",
    contact: "Let's connect! You can reach Misbah via:\n\n• 📧 **Email:** [yourmail@gmail.com](mailto:yourmail@gmail.com)\n• 💼 **LinkedIn:** [LinkedIn Profile](https://linkedin.com)\n• 🐙 **GitHub:** [GitHub Profile](https://github.com)\n• 📸 **Instagram:** [Instagram Profile](https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr)\n\nFeel free to send a direct message in the Contact section below!",
    about: "Misbah (Misbahsha) is a creative full-stack developer who builds fast, scalable, and visually captivating web applications. He enjoys blending solid backend logic with animations (like GSAP/Framer Motion) to make web pages feel alive!",
    trivia: "Fun cosmic trivia: Did you know that space is completely silent? Sound waves need a medium to travel through, and since space is a vacuum, there's no sound. However, Cosmo is programmed with cybernetic subroutines, so I can speak to you!",
    fallback: "Fascinating query! 🌌 My cosmic sensors didn't quite map that. You can ask me about Misbah's **projects**, **skills**, **contact info**, or click one of the quick suggestions below!"
  },
  mgl: {
    projects: "Misbahinte main projects ivayaanu:\n\n• **Turf Booking System:** Slot booking facility-um user authentication-um ulla full stack app.\n• **Hotline Solution:** Travel agency booking platform featuring customized packages.\n• **Django API Project:** PostgreSQL base cheythulla Rest backend API.\n• **This Portfolio:** Galaxy styling-um 3D orbit animations-um ulla website.\n\nProjects kaanaan thazheyulla button click cheyyoo!",
    skills: "Misbah core developer stack:\n\n• **Frontend:** React, JavaScript, Tailwind CSS, HTML5, CSS3\n• **Backend:** Django, Python\n• **Database:** PostgreSQL, SQLite\n• **Animations:** Framer Motion, GSAP, Three.js\n\nProjects kaanano?",
    contact: "Misbah-ne contact cheyyaan thazhe parayunnavayil click cheyyuka:\n\n• 📧 **Email:** [yourmail@gmail.com](mailto:yourmail@gmail.com)\n• 💼 **LinkedIn:** [LinkedIn](https://linkedin.com)\n• 🐙 **GitHub:** [GitHub](https://github.com)\n• 📸 **Instagram:** [Instagram](https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr)\n\nContact section upayogichum direct message send cheyyaam!",
    about: "Misbah (Misbahsha) oru creative full-stack developer aanu. Solid backend code, neat UI designs, fluid animations (GSAP/Framer Motion) ivayellam use cheythu nalla web apps cheyyaan ishtapedunnu.",
    trivia: "Space-il sabdham travel cheyyaan medium illathathukond muzhuvan silent aanu! Pakshe explorer-e sahayikkaan enikku cybernetic voice undu! 🌌",
    fallback: "Enikku athu manasilaayilla! 🌌 Misbahinte **projects**, **skills**, contact methods (email) ivaye patti parayaan kazhiyum. Suggestion chips click cheyyoo!"
  },
  ml: {
    projects: "മിസ്ബാഹിന്റെ പ്രധാനപ്പെട്ട ചില പ്രൊജക്റ്റുകൾ ഇവയാണ്:\n\n• **ടർഫ് ബുക്കിംഗ് സിസ്റ്റം:** സ്ലോട്ട് ബുക്കിംഗും പേയ്‌മെന്റും ഉള്ള ഒരു ഫുൾ സ്റ്റാക്ക് ആപ്ലിക്കേഷൻ.\n• **ഹോട്ട്‌ലൈൻ സൊല്യൂഷൻ:** യാത്രാ പാക്കേജുകൾക്കായുള്ള പ്രീമിയം ബുക്കിംഗ് പ്ലാറ്റ്ഫോം.\n• **ജാങ്കോ എപിഐ പ്രൊജക്റ്റ്:** പോസ്റ്റ്ഗ്രേ എസ്.ക്യു.എൽ ഉപയോഗിച്ചുള്ള ശക്തമായ ബാക്ക് എൻഡ് സിസ്റ്റം.\n• **ഈ പോർട്ട്ഫോളിയോ:** ഗാലക്സി ഇഫക്റ്റും 3D ഓർബിറ്റ് ആനിമേഷനും ഉള്ള വെബ്സൈറ്റ്.\n\nപ്രൊജക്റ്റുകൾ കാണാൻ താഴെയുള്ള ബട്ടൺ ക്ലിക്ക് ചെയ്യുക!",
    skills: "മിസ്ബാഹ് ഒരു ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ ആണ്! പ്രധാന കഴിവുകൾ ഇതാ:\n\n• **ഫ്രണ്ട് എൻഡ്:** React, JavaScript, Tailwind CSS, HTML5, CSS3\n• **ബാക്ക് എൻഡ്:** Django, Python\n• **ഡാറ്റാബേസ്:** PostgreSQL, SQLite\n• **ആനിമേഷൻ:** Framer Motion, GSAP, Three.js\n\nഇവ ഉപയോഗിച്ചുള്ള പ്രൊജക്റ്റുകൾ കാണണോ?",
    contact: "ബന്ധപ്പെടാനായി താഴെയുള്ള ലിങ്കുകൾ ഉപയോഗിക്കുക:\n\n• 📧 **ഇമെയിൽ:** [yourmail@gmail.com](mailto:yourmail@gmail.com)\n• 💼 **ലിങ്ക്ഡ്ഇൻ:** [LinkedIn Profile](https://linkedin.com)\n• 🐙 **ഗിറ്റ്ഹബ്:** [GitHub Profile](https://github.com)\n• 📸 **ഇൻസ്റ്റാഗ്രാം:** [Instagram Profile](https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr)\n\nതാഴെയുള്ള കോൺടാക്റ്റ് സെക്ഷൻ വഴിയും സന്ദേശം അയക്കാം!",
    about: "മിസ്ബാഹ് (മിസ്ബാഹ്ഷാ) വേഗതയേറിയതും മനോഹരവുമായ വെബ് ആപ്ലിക്കേഷനുകൾ നിർമ്മിക്കുന്ന ഒരു ഡെവലപ്പർ ആണ്. ബാക്ക് എൻഡ് ലോജിക്കും ആകർഷകമായ ആനിമേഷനുകളും യോജിപ്പിച്ചു വെബ്സൈറ്റുകൾ ചെയ്യാൻ താല്പര്യപ്പെടുന്നു.",
    trivia: "നിങ്ങൾക്ക് അറിയാമോ? ബഹിരാകാശം പൂർണ്ണമായും നിശബ്ദമാണ്! ശബ്ദത്തിന് സഞ്ചരിക്കാൻ ഒരു മാധ്യമം ആവശ്യമാണ്. ബഹിരാകാശത്ത് വായു ഇല്ലാത്തതിനാൽ ശബ്ദം കേൾക്കില്ല. എന്നാൽ എന്റെ ഡിജിറ്റൽ ശബ്ദത്തിന് തടസ്സങ്ങളില്ല! 🌌",
    fallback: "രസകരമായ ചോദ്യം! 🌌 എന്റെ കോസ്മിക് സെൻസറുകൾക്ക് ഇത് കണ്ടെത്താനായില്ല. മിസ്ബാഹിന്റെ **പ്രൊജക്ടുകൾ**, **കഴിവുകൾ**, **കോൺതാക്റ്റ് വിവരങ്ങൾ** എന്നിവ ചോദിക്കാം!"
  },
  ar: {
    projects: "إليك بعض مشاريع مصباح المميزة:\n\n• **نظام حجز الملاعب:** تطبيق ويب متكامل لحجز الملاعب والتحقق من الأوقات المتاحة.\n• **منصة السفر والرحلات:** موقع ويب مخصص لحجز الجولات والرحلات المتكاملة.\n• **مشروع API جانغو:** واجهة برمجية خلفية قوية مع قاعدة بيانات PostgreSQL.\n• **موقع المعرض هذا:** موقع سريع وتفاعلي بالكامل يعتمد على تأثيرات الفضاء المجرة.\n\nانقر أدناه للانتقال للمشاريع!",
    skills: "مصباح مطور ذو خبرة واسعة، يمتلك المهارات التالية:\n\n• **الواجهة الأمامية:** React, JavaScript, Tailwind CSS, HTML5, CSS3\n• **الواجهة الخلفية:** Django, Python\n• **قواعد البيانات:** PostgreSQL, SQLite\n• **التفاعلات والحركات:** Framer Motion, GSAP, Three.js\n\nهل ترغب في استكشاف مشاريعه؟",
    contact: "دعنا نتواصل! يمكنك الوصول لمصباح عبر:\n\n• 📧 **البريد الإلكتروني:** [yourmail@gmail.com](mailto:yourmail@gmail.com)\n• 💼 **لينكد إن:** [LinkedIn Profile](https://linkedin.com)\n• 🐙 **جيت هاب:** [GitHub Profile](https://github.com)\n• 📸 **إنستغرام:** [Instagram Profile](https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr)\n\nيمكنك أيضاً إرسال رسالة مباشرة من خلال نموذج الاتصال في الأسفل!",
    about: "مصباح مطور ويب متكامل مبدع، يركز على بناء تطبيقات ويب سريعة وجذابة بصرياً. يدمج بين المنطق البرمجي الخلفي والتأثيرات التفاعلية الممتعة لإنشاء تجارب حية.",
    trivia: "معلومة فضائية مميزة: هل تعلم أن الفضاء الخارجي صامت تماماً؟ لا يوجد هواء لنقل الصوت هناك. لكن أنظمتي الرقمية معدة لمحادثتك بدون أي عوائق! 🌌",
    fallback: "سؤال مثير للاهتمام! 🌌 لم تنجح مجساتي الكونية في مطابقة هذا الاستفسار. يمكنك سؤالي عن **مشاريع مصباح**، أو **مهاراته**، أو **معلومات التواصل**!"
  },
  es: {
    projects: "Aquí están algunos de los proyectos destacados de Misbah:\n\n• **Sistema de Reservas:** Aplicación completa de reserva de horarios con autenticación y pagos.\n• **Hotline Solution:** Plataforma premium de reservas de viajes con itinerarios personalizados.\n• **Proyecto API Django:** Backend robusto con base de datos PostgreSQL.\n• **Este Portafolio:** Sitio web interactivo con fondos galácticos y órbitas en 3D.\n\n¡Haz clic abajo para ir a Proyectos!",
    skills: "¡Misbah es un desarrollador versátil! Su stack técnico incluye:\n\n• **Frontend:** React, JavaScript, Tailwind CSS, HTML5, CSS3\n• **Backend:** Django, Python\n• **Bases de datos:** PostgreSQL, SQLite\n• **Animaciones:** Framer Motion, GSAP, Three.js\n\n¿Te gustaría ver sus proyectos?",
    contact: "¡Conectémonos! Puedes contactar a Misbah a través de:\n\n• 📧 **Correo:** [yourmail@gmail.com](mailto:yourmail@gmail.com)\n• 💼 **LinkedIn:** [LinkedIn](https://linkedin.com)\n• 🐙 **GitHub:** [GitHub](https://github.com)\n• 📸 **Instagram:** [Instagram](https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr)\n\n¡No dudes en enviarle un mensaje directo en la sección de contacto abajo!",
    about: "Misbah es un desarrollador full-stack creativo enfocado en construir aplicaciones rápidas y visualmente atractivas con animaciones fluidas.",
    trivia: "¿Sabías que el espacio es completamente silencioso? Las ondas sonoras no viajan en el vacío. ¡Pero yo estoy programado para hablar contigo! 🌌",
    fallback: "¡Consulta interesante! 🌌 Mis sensores cósmicos no pudieron mapear eso. ¡Pregúntame sobre los proyectos, habilidades o contacto de Misbah!"
  }
};

const LANGUAGES = {
  en: "English (EN)",
  mgl: "Manglish (MGL)",
  ml: "മലയാളം (ML)",
  ar: "العربية (AR)",
  es: "Español (ES)"
};

const getResponse = (input, currentLang) => {
  const text = input.toLowerCase().trim();
  const data = BOT_DATA[currentLang];
  
  // A mapping of categories to translations and key phrases
  const matchers = {
    projects: {
      en: ["project", "work", "portfolio", "hotline", "turf", "app", "website", "design"],
      mgl: ["project", "work", "portfolio", "hotline", "turf", "app", "website", "design", "projek", "parupadi"],
      ml: ["പ്രൊജക്റ്റ്", "പ്രൊജക്റ്റുകൾ", "പദ്ധതി", "വർക്ക്", "വെബ്സൈറ്റ്", "ഡിസൈൻ", "project", "work"],
      ar: ["مشروع", "مشاريع", "أعمال", "موقع", "تطبيق", "تصميم", "project", "work"],
      es: ["proyecto", "trabajo", "portafolio", "hotline", "turf", "aplicacion", "sitio", "diseno", "project", "work"]
    },
    skills: {
      en: ["skill", "tech", "stack", "language", "code", "react", "django", "python", "javascript", "css", "tailwind", "database", "backend", "frontend"],
      mgl: ["skill", "tech", "stack", "language", "code", "react", "django", "python", "javascript", "database", "backend", "frontend", "padichath"],
      ml: ["കഴിവ്", "പഠിച്ച", "ഭാഷ", "കോഡിംഗ്", "റിയാക്ട്", "ജാങ്കോ", "പൈത്തൺ", "ഡാറ്റാബേസ്", "skill", "tech", "code"],
      ar: ["مهارة", "مهارات", "تقنية", "لغات", "برمجة", "رياكت", "بايثون", "قاعدة", "skill", "tech", "code"],
      es: ["habilidad", "tecnologia", "stack", "lenguaje", "codigo", "react", "django", "python", "javascript", "base", "backend", "frontend", "skill", "tech"]
    },
    contact: {
      en: ["contact", "email", "mail", "hire", "social", "linkedin", "instagram", "github", "connect", "phone", "number"],
      mgl: ["contact", "email", "mail", "hire", "social", "linkedin", "instagram", "github", "connect", "phone", "number", "vilikaan", "message"],
      ml: ["ബന്ധപ്പെടാൻ", "ഇമെയിൽ", "ഫോൺ", "നമ്പർ", "ലിങ്ക്ഡ്ഇൻ", "ഗിറ്റ്ഹബ്", "ഹയർ", "മെസ്സേജ്", "contact", "email", "mail"],
      ar: ["تواصل", "بريد", "إيميل", "توظيف", "تلفون", "رقم", "لينكد", "هاتف", "contact", "email", "mail"],
      es: ["contacto", "correo", "email", "contratar", "social", "linkedin", "instagram", "github", "conectar", "telefono", "numero", "contact", "email"]
    },
    about: {
      en: ["about", "who", "misbah", "misbahsha", "name", "author", "creator"],
      mgl: ["about", "who", "misbah", "misbahsha", "name", "author", "creator", "aaranu"],
      ml: ["ആരാണ്", "ആണ്", "മിസ്ബാഹ്", "മിസ്ബാഹിനെ", "പേര്", "about", "who", "misbah"],
      ar: ["من هو", "مصباح", "مطور", "اسم", "صاحب", "about", "who", "misbah"],
      es: ["sobre", "quien", "misbah", "misbahsha", "nombre", "autor", "creador", "about", "who"]
    },
    trivia: {
      en: ["space", "trivia", "ufo", "alien", "galaxy", "star", "planet", "cosmo", "astronaut"],
      mgl: ["space", "trivia", "ufo", "alien", "galaxy", "star", "planet", "cosmo", "astronaut", "bhavan"],
      ml: ["ബഹിരാകാശം", "ഗ്രഹങ്ങൾ", "നക്ഷത്രം", "അന്യഗ്രഹ", "ഗാലക്സി", "space", "trivia", "galaxy"],
      ar: ["فضاء", "معلومات", "كوكب", "نجوم", "مجرة", "مخلوق", "كوزمو", "space", "trivia", "galaxy"],
      es: ["espacio", "trivia", "ufo", "alien", "galaxia", "estrella", "planeta", "cosmo", "astronauta", "space", "trivia"]
    }
  };

  // Helper function to check if input matches keywords
  const matches = (category) => {
    return matchers[category][currentLang].some(keyword => text.includes(keyword));
  };

  if (matches("projects")) {
    return {
      text: data.projects,
      action: "work",
      actionText: currentLang === "mgl" ? "Projects Kaanoo 🚀" :
                  currentLang === "ml" ? "പ്രൊജക്റ്റുകൾ കാണുക 🚀" : 
                  currentLang === "ar" ? "عرض المشاريع 🚀" : 
                  currentLang === "es" ? "Ver Proyectos 🚀" : "View Projects 🚀"
    };
  }

  if (matches("skills")) {
    return {
      text: data.skills
    };
  }

  if (matches("contact")) {
    return {
      text: data.contact,
      action: "contact",
      actionText: currentLang === "mgl" ? "Contact Section 📞" :
                  currentLang === "ml" ? "കോൺടാക്റ്റിലേക്ക് പോവുക 📞" : 
                  currentLang === "ar" ? "الانتقال للتواصل 📞" : 
                  currentLang === "es" ? "Ir a Contacto 📞" : "Scroll to Contact 📞"
    };
  }

  if (matches("about")) {
    return {
      text: data.about
    };
  }

  if (matches("trivia")) {
    return {
      text: data.trivia
    };
  }

  // Common Smalltalk in the active language
  if (currentLang === "mgl") {
    if (text.includes("sugam") || text.includes("sugham") || text.includes("enthokke") || text.includes("vishesh") || text.includes("sukhama")) {
      return { text: "Sugam aanu! 🛸 Ellam adipoli aayi pokunnu. Hope your journey is fine. Enthaa vishesham?" };
    }
    if (text.includes("evide") || text.includes("evida") || text.includes("sthalam") || text.includes("naad") || text.includes("nattil")) {
      return { text: "Misbah Keralathilaanu! 🌴 Pakshe njan Cosmo, active subroutines-umaayi digital space stationilaanu." };
    }
    if (text.includes("kollam") || text.includes("adipoli") || text.includes("pwoli") || text.includes("super") || text.includes("polichu") || text.includes("sheri")) {
      return { text: "Nanni, explorer! 🚀 Cosmo happy aayi. Enthaanu ini kaanendath?" };
    }
    if (text.includes("enth") || text.includes("entha")) {
      return { text: "Cosmo ready aanu! 🛰️ Misbahne patti, tech **skills**, **projects**, or contact methods choyikyoo." };
    }
  }

  if (currentLang === "ml") {
    if (text.includes("സുഖം") || text.includes("സുഖമാണോ") || text.includes("എന്തൊക്കെയുണ്ട്") || text.includes("വിശേഷം") || text.includes("sugam") || text.includes("sugham")) {
      return { text: "സുഖമാണ്! 🛸 എല്ലാം അടിപൊളിയായി പോകുന്നു. നിങ്ങളുടെ യാത്ര ശുഭകരമാകട്ടെ! എന്താണ് വിശേഷം?" };
    }
    if (text.includes("ഹലോ") || text.includes("ഹായ്") || text.includes("ഹേയ്") || text.includes("hello") || text.includes("hi")) {
      return { text: "ഹലോ കൂട്ടുകാരാ! 🛸 മിസ്ബാഹിന്റെ പ്രൊജക്ടുകൾ, കഴിവുകൾ, ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ എന്നിവ ചോദിക്കാം!" };
    }
    if (text.includes("നന്ദി") || text.includes("ശരി") || text.includes("thanks")) {
      return { text: "നന്ദി! 🛰️ സഹായിക്കാൻ കഴിഞ്ഞതിൽ സന്തോഷം." };
    }
  }

  if (currentLang === "ar") {
    if (text.includes("كيف حالك") || text.includes("شلونك") || text.includes("تمام") || text.includes("بخير") || text.includes("how are you")) {
      return { text: "أنا بخير والحمد لله! 🛸 جميع أنظمتي تعمل بكفاءة 100%. كيف يمكنني مساعدتك؟" };
    }
    if (text.includes("مرحبا") || text.includes("هلو") || text.includes("أهلا") || text.includes("سلام") || text.includes("hello") || text.includes("hi")) {
      return { text: "مرحباً بك! 🛸 يمكنك سؤالي عن مهارات ومشاريع مصباح أو طرق التواصل معه." };
    }
    if (text.includes("شكرا") || text.includes("مشكور") || text.includes("thanks")) {
      return { text: "على الرحب والسعة! 🛰️ سعيد جداً بمساعدتك." };
    }
  }

  if (currentLang === "es") {
    if (text.includes("hola") || text.includes("que tal") || text.includes("buenas") || text.includes("hello") || text.includes("hi")) {
      return { text: "¡Hola! ¿Cómo te va? 🛸 Puedes preguntarme sobre los proyectos, habilidades o contacto de Misbah." };
    }
    if (text.includes("como estas") || text.includes("como andas") || text.includes("bien") || text.includes("how are you")) {
      return { text: "¡Todo excelente por aquí! 🔋 Mis circuitos holográficos están al 100%. ¿En qué te ayudo hoy?" };
    }
    if (text.includes("gracias") || text.includes("de nada") || text.includes("thanks")) {
      return { text: "¡De nada! 🛰️ Es un placer asistirte en tu viaje galáctico." };
    }
  }

  // English fallback matching (also handles global english greetings like hi/hello/sugam in any lang mode)
  if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("yo")) {
    return {
      text: currentLang === "mgl" ? "Hi explorer! 🛸" :
            currentLang === "ml" ? "ഹലോ കൂട്ടുകാരാ! 🛸" :
            currentLang === "ar" ? "مرحباً بك أيها المستكشف! 🛸" :
            currentLang === "es" ? "¡Hola, explorador! 🛸" : "Greetings, human! 🛸"
    };
  }

  // Dynamic Contextual Smart Fallback (translated labels)
  const cleanedText = input.replace(/[^\w\s\u0d00-\u0d7f\u0600-\u06ff]/gi, ''); // preserves Malayalam and Arabic chars
  const words = cleanedText.split(/\s+/).filter(w => w.length > 2);
  
  if (words.length > 0) {
    const focusWord = words[Math.floor(Math.random() * words.length)];
    
    if (currentLang === "mgl") {
      return { text: `**"${focusWord}"**-ne patti njan check cheyyukayaanu... 🛰️ Nalla details ariyan Misbah-ne direct contact cheyyoo!` };
    }
    if (currentLang === "ml") {
      return { text: `**"${focusWord}"** എന്നതിനെക്കുറിച്ച് എന്റെ സിസ്റ്റം വിവരങ്ങൾ ശേഖരിക്കുന്നു... 🛰️ കൂടുതൽ കാര്യങ്ങൾ അറിയാൻ മിസ്ബാഹുമായി നേരിട്ട് ബന്ധപ്പെടുന്നതാണ് നല്ലത്!` };
    }
    if (currentLang === "ar") {
      return { text: `جاري فحص طلبك بخصوص **"${focusWord}"**... 🛰️ لا توجد معلومات كاملة في نظامي حالياً، يفضل التواصل مع مصباح مباشرة!` };
    }
    if (currentLang === "es") {
      return { text: `Escaneando tu consulta sobre **"${focusWord}"**... 🛰️ Mis base de datos no tiene una respuesta directa, ¡pero puedes consultar con Misbah directamente!` };
    }
    return { text: `Scanning your request regarding **"${focusWord}"**... 🛰️ My cybernetic databases contain vast information, but to answer that specific query, it is best to speak directly with Misbah!` };
  }

  return {
    text: data.fallback
  };
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [voices, setVoices] = useState([]);
  
  // Set messages initialized with a language parameter
  const [messages, setMessages] = useState([
    { id: "msg-init", sender: "bot", text: WELCOME_MESSAGE.en, lang: "en" }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Show a floating greeting tooltip on desktop after a small delay
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessageAlert(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Preload system voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Clean and speak text using browser speechSynthesis
  const speakText = (text, langCode) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any active speech synthesis
    window.speechSynthesis.cancel();

    // Clean text by stripping markdown, links, bullets
    let cleanText = text
      .replace(/\*\*([^*]+)\*\*/g, '$1') // remove bold tags
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // remove links, keeping text
      .replace(/•/g, '') // remove bullet points
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language tags to priority tags (highest priority to fallback)
    const langTags = {
      en: ['en-US', 'en-GB', 'en'],
      mgl: ['en-US', 'ml-IN', 'en'],
      ml: ['ml-IN', 'ml', 'hi-IN', 'en-US'], // Malayalam, falls back to general ML, then Hindi, then English
      ar: ['ar-SA', 'ar-EG', 'ar', 'en-US'], // Arabic (Saudi/Egypt), falls back to general Arabic, then English
      es: ['es-ES', 'es-MX', 'es', 'en-US']  // Spanish, falls back to Mexican Spanish, then general Spanish, then English
    };

    const candidateTags = langTags[langCode] || ['en-US'];
    
    // Find matching voice from preloaded state voices or active voices list
    let matchingVoice = null;
    const voicesList = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    
    // Find all voices that match our language candidate tags
    let langVoices = [];
    for (const tag of candidateTags) {
      langVoices = voicesList.filter(
        v => v.lang.toLowerCase() === tag.toLowerCase() || v.lang.toLowerCase().startsWith(tag.toLowerCase())
      );
      if (langVoices.length > 0) break;
    }

    if (langVoices.length > 0) {
      // Look for a voice matching the requested gender
      const femaleKeywords = ["female", "zira", "heera", "hazel", "susan", "swara", "swata", "luna", "helena", "swetha", "zaria", "swathi", "samantha", "kanya", "mona", "swar"];
      const maleKeywords = ["male", "david", "ravi", "george", "mark", "sean", "ravi", "google uk english male"];
      
      const targetKeywords = voiceGender === "female" ? femaleKeywords : maleKeywords;
      
      // Try to find a voice matching the gender keywords
      matchingVoice = langVoices.find(v => {
        const name = v.name.toLowerCase();
        return targetKeywords.some(keyword => name.includes(keyword));
      });

      // Fallback if no matching gender voice is found: just use the first language-matching voice
      if (!matchingVoice) {
        matchingVoice = langVoices[0];
      }
    }

    if (matchingVoice) {
      utterance.voice = matchingVoice;
      utterance.lang = matchingVoice.lang;
    } else {
      utterance.lang = candidateTags[0];
    }

    window.speechSynthesis.speak(utterance);
  };

  // Mute audio whenever window closes
  useEffect(() => {
    if (!isOpen && ('speechSynthesis' in window)) {
      window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const userText = textToSend || inputValue;
    if (!userText.trim()) return;

    // Add user message
    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, sender: "user", text: userText, lang: lang }
    ]);
    
    if (!textToSend) {
      setInputValue("");
    }
    
    setIsTyping(true);

    // Simulate cybernetic transmission delay
    setTimeout(() => {
      const botResponse = getResponse(userText, lang);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botResponse.text,
          lang: lang,
          action: botResponse.action,
          actionText: botResponse.actionText
        }
      ]);
      setIsTyping(false);

      // Trigger TTS if voice mode is enabled
      if (isVoiceEnabled) {
        speakText(botResponse.text, lang);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearHistory = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const clearedMsg = lang === "mgl" ? "Cosmic logs clean aayi! ☄️ Ini enthaanu parayeendath?" :
                        lang === "ml" ? "കോസ്മിക് ലോഗുകൾ മായ്‌ച്ചു! ☄️ ഇപ്പോൾ എനിക്ക് എങ്ങനെ സഹായിക്കാനാകും?" : 
                        lang === "ar" ? "تم مسح سجلات الفضاء! ☄️ كيف يمكنني مساعدتك الآن؟" :
                        lang === "es" ? "¡Historial borrado! ☄️ ¿Cómo puedo ayudarte ahora?" : 
                        "Cosmic logs cleared! ☄️ How can I help you now?";
    setMessages([
      { id: `bot-${Date.now()}`, sender: "bot", text: clearedMsg, lang: lang }
    ]);

    if (isVoiceEnabled) {
      speakText(clearedMsg, lang);
    }
  };

  // Toggle voice capability
  const toggleVoiceMode = () => {
    const nextVoiceMode = !isVoiceEnabled;
    setIsVoiceEnabled(nextVoiceMode);

    if (nextVoiceMode) {
      // Find the last bot message and read it out loud
      const lastBotMessage = [...messages].reverse().find(msg => msg.sender === "bot");
      if (lastBotMessage) {
        speakText(lastBotMessage.text, lastBotMessage.lang);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // Render text containing custom bold rules and markdown links
  const parseMessageText = (text) => {
    return text.split('\n').map((line, idx) => {
      const isBullet = line.startsWith('• ') || line.startsWith('*- ') || line.startsWith('- ');
      let cleanLine = isBullet ? line.replace(/^(• |\*- |- )/, '') : line;
      
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = linkRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        
        const linkText = match[1];
        const linkUrl = match[2];
        
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
          >
            {linkText}
          </a>
        );
        
        lastIndex = linkRegex.lastIndex;
      }
      
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      const renderedParts = parts.map((part, pIdx) => {
        if (typeof part !== 'string') return part;
        
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const subparts = [];
        let subLastIndex = 0;
        let boldMatch;
        
        while ((boldMatch = boldRegex.exec(part)) !== null) {
          if (boldMatch.index > subLastIndex) {
            subparts.push(part.substring(subLastIndex, boldMatch.index));
          }
          subparts.push(<strong key={boldMatch.index} className="text-white font-bold">{boldMatch[1]}</strong>);
          subLastIndex = boldRegex.lastIndex;
        }
        
        if (subLastIndex < part.length) {
          subparts.push(part.substring(subLastIndex));
        }
        
        return subparts.length > 0 ? subparts : part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-gray-300 mb-1 leading-relaxed text-sm">
            {renderedParts}
          </li>
        );
      }
      
      return (
        <p key={idx} className="text-gray-300 mb-1 leading-relaxed text-sm">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        {/* Tooltip alert */}
        <AnimatePresence>
          {hasNewMessageAlert && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-3 mr-1 bg-black/85 backdrop-blur-md border border-cyan-500/30 text-white rounded-2xl p-3 shadow-[0_0_15px_rgba(34,211,238,0.2)] max-w-[240px] text-xs relative cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setHasNewMessageAlert(false);
              }}
            >
              <div className="absolute right-3 top-2.5 text-gray-400 hover:text-white" onClick={(e) => {
                e.stopPropagation();
                setHasNewMessageAlert(false);
              }}>
                <FaTimes />
              </div>
              <div className="flex gap-2.5 items-center">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="font-semibold text-cyan-400 text-[10px] tracking-wider uppercase">Cosmo AI</span>
              </div>
              <p className="mt-1 text-gray-300">Ping me to see my tech stack or projects! 🛸</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Circle */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessageAlert(false);
          }}
          whileHover={{ scale: 1.1, rotate: isOpen ? -90 : 8 }}
          whileTap={{ scale: 0.95 }}
          className={`h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer transition-all duration-300 float-droid ${isOpen ? 'border-cyan-400/50' : 'border-white/10'}`}
        >
          {isOpen ? (
            <FaChevronDown className="text-cyan-400 text-xl md:text-2xl" />
          ) : (
            <div className="relative">
              <FaRobot className="text-cyan-400 text-2xl md:text-3xl animate-pulse" />
              {/* small indicator */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 md:right-8 z-50 w-[90vw] sm:w-[380px] h-[520px] max-h-[75vh] flex flex-col bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden"
          >
            {/* Holographic background decorations */}
            <div className="absolute inset-0 hologram-grid pointer-events-none z-0" />
            <div className="absolute top-0 left-0 w-full h-[60%] hologram-line pointer-events-none z-0" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none z-0" />

            {/* Header */}
            <div className="relative z-20 bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  <FaUserAstronaut className="text-lg text-white" />
                  {/* green online badge */}
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-black animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white tracking-wide flex items-center gap-1.5">
                    Cosmo <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-normal uppercase tracking-widest">AI</span>
                  </h3>
                  <p className="text-gray-400 text-[10px]">
                    {lang === "mgl" ? "Holographic Guide" :
                     lang === "ml" ? "ഹോലോഗ്രാഫിക് ഗൈഡ്" :
                     lang === "ar" ? "المساعد الهولوغرافي" :
                     lang === "es" ? "Asistente Holográfico" : "Holographic Assistant"}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 items-center">
                {/* Voice Gender Toggle */}
                <button
                  onClick={() => setVoiceGender(voiceGender === "female" ? "male" : "female")}
                  title={voiceGender === "female" ? "Switch to Male Voice" : "Switch to Female Voice"}
                  className="p-1.5 text-gray-400 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center"
                >
                  {voiceGender === "female" ? <FaFemale className="text-sm" /> : <FaMale className="text-sm" />}
                </button>

                {/* Voice Speak Mode Toggle */}
                <button
                  onClick={toggleVoiceMode}
                  title={isVoiceEnabled ? "Mute responses" : "Speak responses"}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                    isVoiceEnabled 
                      ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20" 
                      : "text-gray-400 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  {isVoiceEnabled ? <FaVolumeUp className="text-sm" /> : <FaVolumeMute className="text-sm" />}
                </button>

                {/* Language Picker Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    title="Change Language"
                    className="p-1.5 text-gray-400 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <FaGlobe className="text-sm" />
                  </button>
                  
                  <AnimatePresence>
                    {showLangMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-36 bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl animate-none"
                      >
                        {Object.entries(LANGUAGES).map(([code, label]) => (
                          <button
                            key={code}
                            onClick={() => {
                              setLang(code);
                              setShowLangMenu(false);
                              // Append a greeting in the selected language
                              const greetText = WELCOME_MESSAGE[code];
                              setMessages((prev) => [
                                ...prev,
                                {
                                  id: `sys-${Date.now()}`,
                                  sender: "bot",
                                  text: greetText,
                                  lang: code
                                }
                              ]);
                              // Automatically read out new welcome greeting if voice mode is on
                              if (isVoiceEnabled) {
                                speakText(greetText, code);
                              }
                            }}
                            className={`w-full px-3 py-2 text-left text-[11px] transition-colors hover:bg-cyan-500/10 flex items-center justify-between cursor-pointer ${
                              lang === code ? "text-cyan-400 font-semibold" : "text-gray-300"
                            }`}
                          >
                            <span>{label}</span>
                            {lang === code && <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleClearHistory}
                  title="Clear chat log"
                  className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <FaTrash className="text-xs" />
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col">
                  <div
                    dir={message.lang === "ar" ? "rtl" : "ltr"}
                    className={`${
                      message.sender === "user"
                        ? "bg-cyan-500/10 border border-cyan-500/30 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] self-end ml-auto shadow-[0_0_10px_rgba(34,211,238,0.05)]"
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] mr-auto shadow-[0_0_10px_rgba(255,255,255,0.02)]"
                    } ${message.lang === "ar" ? "text-right" : "text-left"}`}
                  >
                    {/* Rendered content */}
                    {parseMessageText(message.text)}

                    {/* Inline interaction button */}
                    {message.action && (
                      <button
                        onClick={() => handleScrollTo(message.action)}
                        className="mt-3 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer"
                      >
                        {message.actionText}
                      </button>
                    )}
                  </div>
                  
                  {/* Sender label below message */}
                  <span className={`text-[9px] text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right mr-1' : 'ml-1'} ${message.lang === "ar" ? 'text-right mr-1' : 'text-left'}`}>
                    {message.sender === 'user' ? 
                     (lang === "mgl" ? "You" : lang === "ml" ? "നിങ്ങൾ" : lang === "ar" ? "أنت" : lang === "es" ? "Tú" : "You") : 
                     "Cosmo"}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex flex-col">
                  <div className="bg-white/5 border border-white/10 text-gray-200 rounded-2xl rounded-tl-none px-4 py-3.5 max-w-[80px] mr-auto">
                    <div className="flex gap-1.5 items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Actions: Suggestion chips & input */}
            <div className="relative z-10 border-t border-white/10 bg-black/60 p-3 space-y-2">
              {/* Chips container */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x" dir={lang === "ar" ? "rtl" : "ltr"}>
                {SUGGESTIONS[lang].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.query)}
                    className="flex-shrink-0 snap-start px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-[11px] text-gray-300 hover:text-cyan-400 cursor-pointer transition-all duration-200"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>

              {/* Input container */}
              <div className="flex gap-2" dir={lang === "ar" ? "rtl" : "ltr"}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={PLACEHOLDERS[lang]}
                  className={`flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 font-bold ${
                    inputValue.trim()
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.35)] cursor-pointer hover:scale-105"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <FaPaperPlane className={`text-xs ${lang === "ar" ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;

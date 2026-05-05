import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "С чего начинается работа над проектом?",
    answer:
      "Всё начинается с бесплатной консультации — мы слушаем вас, задаём вопросы о задаче, участке и бюджете. После этого готовим бриф и коммерческое предложение. Никакого давления — только честный разговор о том, чего вы хотите.",
  },
  {
    question: "Сколько стоит разработка проекта?",
    answer:
      "Стоимость зависит от типа объекта, площади и состава услуг. Эскизный проект частного дома начинается от 300 000 ₽. Точную цифру назовём после первой встречи — нет смысла угадывать без понимания задачи.",
  },
  {
    question: "Вы работаете только с новым строительством?",
    answer:
      "Нет. Мы занимаемся и реконструкцией, и перепланировкой, и надстройкой. Часто именно в работе с существующим зданием рождаются самые интересные решения — это наш любимый вид задач.",
  },
  {
    question: "Берётесь ли вы за авторский надзор?",
    answer:
      "Да, и мы настоятельно рекомендуем это делать. Авторский надзор позволяет контролировать соответствие построенного тому, что было задумано. Без него подрядчики нередко «упрощают» решения — и от замысла мало что остаётся.",
  },
  {
    question: "В каких регионах вы работаете?",
    answer:
      "Основная география — Москва, Подмосковье и крупные города России. Для интересных проектов готовы выезжать в регионы и работать удалённо там, где это возможно.",
  },
  {
    question: "Сколько времени занимает разработка проекта?",
    answer:
      "Эскизный проект жилого дома — 4–6 недель. Рабочая документация — ещё 2–3 месяца. Для коммерческих объектов сроки обсуждаются индивидуально. Мы не гонимся за скоростью в ущерб качеству, но умеем работать в сжатые сроки при необходимости.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
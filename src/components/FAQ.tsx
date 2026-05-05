import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как начать сотрудничество с АСР?",
    answer:
      "Позвоните нам или оставьте заявку — мы свяжемся с вами в течение часа. Проведём бесплатный выезд на объект, замерим помещение и составим детальную смету. Никаких предоплат до подписания договора.",
  },
  {
    question: "Сколько стоит ремонт под ключ?",
    answer:
      "Стоимость зависит от площади, состояния помещения и класса отделки. Ремонт квартиры под ключ начинается от 15 000 ₽/м². Точную смету составляем бесплатно после выезда специалиста.",
  },
  {
    question: "Даёте ли вы гарантию на выполненные работы?",
    answer:
      "Да. Мы предоставляем официальную гарантию на все виды выполненных работ. Если в гарантийный период что-то пойдёт не так — устраним за наш счёт, без споров и волокиты.",
  },
  {
    question: "Сколько времени занимает ремонт квартиры?",
    answer:
      "Стандартный капитальный ремонт квартиры 60–80 м² занимает 2–3 месяца. Сроки фиксируются в договоре. При нарушении сроков по нашей вине выплачиваем неустойку.",
  },
  {
    question: "Вы работаете с коммерческой недвижимостью?",
    answer:
      "Да, это одно из ключевых направлений. Выполняем ремонт офисов, ресторанов, магазинов, гостиниц и других коммерческих объектов. Работаем в Москве и Сочи, умеем организовывать работу без остановки бизнеса.",
  },
  {
    question: "Можете ли вы разработать дизайн-проект?",
    answer:
      "Конечно. У нас есть собственные дизайнеры интерьеров, которые разработают авторский проект с 3D-визуализацией. Можем реализовать проект под ключ или работать с вашим дизайнером.",
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
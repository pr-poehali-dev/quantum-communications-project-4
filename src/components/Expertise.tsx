import { useEffect, useRef, useState } from "react"
import { Home, Building, Armchair, Trees } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Капитальный ремонт",
    description: "Полный цикл капитального ремонта квартир и домов: от демонтажа до финишной отделки. Работаем в новостройках и во вторичном жилье любой сложности.",
    icon: Home,
  },
  {
    title: "Коммерческая недвижимость",
    description:
      "Ремонт и перепланировка офисов, магазинов, ресторанов и гостиниц. Соблюдаем все нормы, работаем без остановки бизнеса там, где это возможно.",
    icon: Building,
  },
  {
    title: "Дизайн интерьеров",
    description:
      "Разрабатываем авторские дизайн-проекты и реализуем их под ключ. От концепции и 3D-визуализации до закупки мебели и декора.",
    icon: Armchair,
  },
  {
    title: "Отделочные работы",
    description:
      "Штукатурка, стяжка, плитка, паркет, покраска — выполняем все виды отделочных работ с премиальным качеством и соблюдением сроков.",
    icon: Trees,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>17 лет</HighlightedText> на
            <br />
            рынке
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Сотни реализованных объектов в Москве и Сочи. Предоставляем полный спектр услуг — от разработки дизайн-проекта до сдачи готового помещения с гарантией.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
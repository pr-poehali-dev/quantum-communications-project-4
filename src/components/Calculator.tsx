import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const repairTypes = [
  { id: "cosmetic", label: "Косметический", pricePerM2: 7000 },
  { id: "standard", label: "Стандартный", pricePerM2: 12000 },
  { id: "premium", label: "Премиум", pricePerM2: 20000 },
  { id: "design", label: "Дизайнерский", pricePerM2: 35000 },
]

const objectTypes = [
  { id: "apartment", label: "Квартира", icon: "Home" },
  { id: "house", label: "Частный дом", icon: "TreePine" },
  { id: "commercial", label: "Коммерция", icon: "Building2" },
]

const extras = [
  { id: "design_project", label: "Дизайн-проект", price: 50000 },
  { id: "demolition", label: "Демонтаж", price: 30000 },
  { id: "plumbing", label: "Сантехника", price: 80000 },
  { id: "electrics", label: "Электрика", price: 70000 },
  { id: "furniture", label: "Мебель на заказ", price: 150000 },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price)

export function Calculator() {
  const [objectType, setObjectType] = useState("apartment")
  const [repairType, setRepairType] = useState("standard")
  const [area, setArea] = useState(60)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const repair = repairTypes.find((r) => r.id === repairType)!
  const basePrice = area * repair.pricePerM2
  const extrasPrice = extras.filter((e) => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0)
  const totalPrice = basePrice + extrasPrice
  const totalMin = Math.round(totalPrice * 0.9)
  const totalMax = Math.round(totalPrice * 1.1)

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  return (
    <section id="calculator" className="py-32 bg-secondary/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Онлайн-калькулятор</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            Рассчитайте
            <br />
            <HighlightedText>стоимость</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Укажите параметры объекта — получите предварительную оценку. Точную смету составим бесплатно после выезда.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Controls */}
          <div className="space-y-10">
            {/* Object type */}
            <div>
              <p className="text-sm font-medium mb-4 tracking-wide uppercase text-muted-foreground">Тип объекта</p>
              <div className="grid grid-cols-3 gap-3">
                {objectTypes.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setObjectType(obj.id)}
                    className={`flex flex-col items-center gap-2 py-4 px-3 border transition-all duration-200 text-sm font-medium ${
                      objectType === obj.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:border-foreground/40"
                    }`}
                  >
                    <Icon name={obj.icon as "Home"} size={20} strokeWidth={1.5} />
                    {obj.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Площадь</p>
                <span className="text-2xl font-medium">{area} м²</span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1 appearance-none bg-border rounded-none cursor-pointer accent-foreground"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>20 м²</span>
                <span>500 м²</span>
              </div>
            </div>

            {/* Repair type */}
            <div>
              <p className="text-sm font-medium mb-4 tracking-wide uppercase text-muted-foreground">Класс ремонта</p>
              <div className="grid grid-cols-2 gap-3">
                {repairTypes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRepairType(r.id)}
                    className={`flex items-center justify-between py-3 px-4 border transition-all duration-200 text-sm ${
                      repairType === r.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:border-foreground/40"
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className={`text-xs ${repairType === r.id ? "text-background/70" : "text-muted-foreground"}`}>
                      от {(r.pricePerM2 / 1000).toFixed(0)}к/м²
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <p className="text-sm font-medium mb-4 tracking-wide uppercase text-muted-foreground">Дополнительно</p>
              <div className="space-y-2">
                {extras.map((extra) => {
                  const checked = selectedExtras.includes(extra.id)
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`w-full flex items-center justify-between py-3 px-4 border transition-all duration-200 text-sm ${
                        checked
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background hover:border-foreground/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
                            checked ? "border-background bg-background" : "border-current"
                          }`}
                        >
                          {checked && <Icon name="Check" size={10} strokeWidth={3} className="text-foreground" />}
                        </div>
                        {extra.label}
                      </div>
                      <span className={`text-xs ${checked ? "text-background/70" : "text-muted-foreground"}`}>
                        +{formatPrice(extra.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="bg-foreground text-background p-10">
              <p className="text-background/60 text-sm tracking-[0.2em] uppercase mb-8">Предварительная оценка</p>

              <div className="mb-8">
                <p className="text-background/60 text-sm mb-2">Базовые работы ({area} м² × {formatPrice(repair.pricePerM2)}/м²)</p>
                <p className="text-3xl font-medium">{formatPrice(basePrice)}</p>
              </div>

              {selectedExtras.length > 0 && (
                <div className="mb-8 space-y-2 border-t border-background/20 pt-6">
                  {extras
                    .filter((e) => selectedExtras.includes(e.id))
                    .map((e) => (
                      <div key={e.id} className="flex justify-between text-sm">
                        <span className="text-background/70">{e.label}</span>
                        <span>+{formatPrice(e.price)}</span>
                      </div>
                    ))}
                </div>
              )}

              <div className="border-t border-background/20 pt-8 mb-10">
                <p className="text-background/60 text-sm mb-3">Итого (ориентировочно)</p>
                <p className="text-5xl font-medium leading-none mb-2">{formatPrice(totalMin)}</p>
                <p className="text-background/50 text-sm">— {formatPrice(totalMax)}</p>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+74951234567"
                  className="w-full flex items-center justify-center gap-2 bg-background text-foreground py-4 text-sm font-medium tracking-wide hover:bg-background/90 transition-colors"
                >
                  <Icon name="Phone" size={16} />
                  Обсудить проект
                </a>
                <p className="text-center text-background/40 text-xs">
                  Бесплатный выезд и точная смета — в течение 24 часов
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

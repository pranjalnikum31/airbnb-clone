export default function Section({ title, items }) {
  return (
    <section className="px-10 mt-10 ">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-6 overflow-x-scroll scrollbar-hide">
        {items.map(item => (
          <div key={item.id} className="min-w-[280px]">
            {item.component}
          </div>
        ))}
      </div>
    </section>
  )
}

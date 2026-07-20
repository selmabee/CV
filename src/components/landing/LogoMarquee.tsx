import { companyLogos } from '../../data';

export default function LogoMarquee() {
  const allLogos = [...companyLogos, ...companyLogos];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Ces CV ont atterri chez
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {allLogos.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-8 px-6 py-3 bg-white rounded-lg border border-slate-200 shadow-sm"
            >
              <span className="text-lg font-semibold text-slate-700">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Menu, X, TrendingUp, Calculator, Users, Briefcase, 
  Search, ShieldCheck, ChevronDown, MapPin, Mail, Phone, ArrowRight 
} from 'lucide-react';
import logo from './assets/logo.png';

const AtendconSPA = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Barra de progresso de scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const WHATSAPP_LINK = "https://wa.me/5531900000000"; // INSIRA O NÚMERO AQUI

  const services = [
    {
      title: "Gestão Contábil",
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      desc: "Classificação, escrituração contábil e análise de demonstrações (Balanço, DRE). Entrega de SPED e E-Lalur."
    },
    {
      title: "Gestão Fiscal",
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      desc: "Apuração de tributos (ICMS, IPI, PIS, Cofins, ISSQN) e transmissão de obrigações acessórias (DCTF, Dapi, VAF)."
    },
    {
      title: "Departamento Pessoal",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      desc: "Elaboração de folha de pagamento, cálculo de rescisões, controle de férias e envio de obrigações mensais/anuais."
    },
    {
      title: "Consultoria Tributária e Societária",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      desc: "Assessoria técnica, regimes especiais de tributação e treinamentos com atualizações da legislação."
    },
    {
      title: "Auditoria Eletrônica (SPED)",
      icon: <Search className="w-8 h-8 text-blue-600" />,
      desc: "Validação profunda e certificação de arquivos fiscais/contábeis para reduzir riscos tributários."
    },
    {
      title: "Legalização de Empresas",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      desc: "Constituição, alterações contratuais e regularização de registros. Inclui também declarações de IRPF."
    }
  ];

  const faqs = [
    { q: "Como funciona a troca de contador para a Atendcon?", a: "O processo é simples e transparente. Nós cuidamos de toda a transição de documentos e dados fiscais com seu antigo contador, garantindo 100% de conformidade." },
    { q: "Vocês atendem empresas de quais portes?", a: "Atendemos desde microempreendedores até grandes empresas, adaptando nossos serviços de gestão fiscal e contábil ao grau de complexidade do seu negócio." },
    { q: "O atendimento é 100% digital?", a: "Sim, utilizamos ferramentas tecnológicas para recebimento e envio de documentos, mas mantemos um relacionamento próximo e consultivo." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />

      {/* 1. NAVBAR */}
      <header className="fixed w-full top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Atendcon Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>
          
          <nav className="hidden md:flex gap-8 items-center font-medium text-sm">
            <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#metodo" className="hover:text-blue-600 transition-colors">Método</a>
            <a href="#sobre" className="hover:text-blue-600 transition-colors">Quem Somos</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
            <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" className="text-slate-900 hover:text-blue-600 font-bold transition-colors">
              Área do Cliente
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
              Falar com Especialista
            </a>
          </nav>

          <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col p-6 gap-4 font-medium"
            >
              <a href="#servicos" onClick={() => setIsMobileMenuOpen(false)}>Serviços</a>
              <a href="#metodo" onClick={() => setIsMobileMenuOpen(false)}>Método</a>
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)}>Quem Somos</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
              <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 font-bold mt-2">Área do Cliente</a>
              <a href={WHATSAPP_LINK} className="bg-blue-600 text-white text-center py-3 rounded-xl mt-2">Falar com Especialista</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-sm mb-6 backdrop-blur-sm">
              Excelência e Tradição Contábil em BH
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Estruture o futuro do seu negócio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">precisão contábil.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Fornecemos serviços personalizados de contabilidade, gestão fiscal e consultoria empresarial. Deixe a burocracia com especialistas e foque exclusivamente no crescimento da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_LINK} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Agendar Consultoria <ArrowRight size={20}/>
              </a>
              <a href="#servicos" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-center hover:bg-white/20 transition backdrop-blur-sm">
                Explorar Serviços
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20"
          >
            {[
              { label: "Anos de Experiência", value: "+10" },
              { label: "Clientes Satisfeitos", value: "+500" },
              { label: "Conformidade Fiscal", value: "100%" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white">
                <div className="text-3xl font-black text-blue-400 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O Que Entregamos</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Soluções completas para lidar com qualquer grau de complexidade financeira, fiscal e trabalhista.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="bg-slate-50 border border-slate-100 p-8 rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-blue-600/10 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal de Serviços */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-3xl max-w-lg w-full relative"
              >
                <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
                <div className="mb-6">{selectedService.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
                <p className="text-slate-600 mb-8">{selectedService.desc}</p>
                <a href={WHATSAPP_LINK} className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700">
                  Solicitar este serviço
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. METODO SECTION */}
      <section id="metodo" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nosso Método</h2>
            <p className="text-slate-400 max-w-xl">Um processo validado para trazer segurança jurídica e performance financeira para o seu negócio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Diagnóstico", desc: "Análise profunda da atual situação fiscal e contábil." },
              { step: "02", title: "Compliance", desc: "Saneamento de pendências e regularização completa." },
              { step: "03", title: "Planejamento", desc: "Desenho de regimes tributários e metas financeiras." },
              { step: "04", title: "Performance", desc: "Acompanhamento mensal com auditoria eletrônica." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                <span className="text-6xl font-black text-white/5 absolute -top-2 -right-2">{item.step}</span>
                <h4 className="text-xl font-bold mb-3 relative z-10 text-blue-400">{item.title}</h4>
                <p className="text-slate-400 text-sm relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUEM SOMOS */}
      <section id="sobre" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" alt="Team" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <ShieldCheck size={40} className="mb-4" />
              <div className="font-bold text-xl">Alto Padrão</div>
              <div className="text-blue-200 text-sm">Contabilidade Consultiva</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Atenção que sua empresa precisa</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              A ATENDCON CONTABILIDADE fornece serviços personalizados em Belo Horizonte. Nossa equipe altamente treinada busca sempre novos conhecimentos para lidar com todas as suas necessidades, seja qual for o grau de complexidade.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Nossa Missão</h4>
                <p className="text-slate-600 text-sm">Entregar segurança jurídica e financeira através de uma contabilidade consultiva, permitindo que você foque no que faz de melhor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Dúvidas Frequentes</h2>
            <p className="text-slate-600 mb-8">Não encontrou o que procurava? Fale diretamente com nossa equipe.</p>
            <a href={WHATSAPP_LINK} className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition">
              Chamar no WhatsApp <ArrowRight size={18}/>
            </a>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left bg-slate-50 hover:bg-slate-100 transition"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 bg-slate-50 text-slate-600"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80')] opacity-10 object-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Transforme a contabilidade em Vantagem Competitiva.</h2>
          <p className="text-xl text-blue-100 mb-10">Economize tempo, dinheiro e frustração na gestão das suas finanças.</p>
          <a href={WHATSAPP_LINK} className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition shadow-2xl">
            Iniciar Diagnóstico Gratuito
          </a>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#020617] text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img src={logo} alt="Atendcon Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <p className="text-sm">Atenção que sua empresa precisa. Especialistas em gestão fiscal, contábil e departamento pessoal em Belo Horizonte.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center gap-3"><MapPin size={18} className="text-blue-500 flex-shrink-0" /> Avenida Cristiano Machado 640 sala 1507<br/>Sagrada Familia - BH- CEP 31030-514</p>
              <p className="flex items-center gap-3"><Phone size={18} className="text-blue-500" /> (31) 90000-0000</p>
              <p className="flex items-center gap-3"><Mail size={18} className="text-blue-500" /> contato@atendcon.com.br</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" className="text-blue-400 font-bold hover:text-white transition">Área do Cliente</a>
              <a href="#servicos" className="hover:text-white transition">Serviços</a>
              <a href="#metodo" className="hover:text-white transition">Nosso Método</a>
              <a href="#sobre" className="hover:text-white transition">Quem Somos</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} ATENDCON CONTABILIDADE. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0 text-slate-500">CNPJ: 00.000.000/0000-00</p>
        </div>
      </footer>

      {/* 10. FLOATING WHATSAPP */}
      <a 
        href={WHATSAPP_LINK} 
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      >
        <Phone size={28} /> {/* Substitua pelo React Icon do FaWhatsapp se preferir */}
      </a>
    </div>
  );
};

export default AtendconSPA;

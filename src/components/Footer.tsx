import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ContactType = 'sales' | 'storage' | 'dcr-hub' | 'general';

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactType: 'general' as ContactType,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        contactType: 'general',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="py-16" style={{ backgroundColor: '#181f25', borderTop: '1px solid #364049' }}>
      <div className="container mx-auto px-4 md:px-12">
        
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand Info - Changed brand to white with yellow top border */}
          <div>
            <div 
              className="text-3xl font-black uppercase tracking-tighter mb-4 pt-4"
              style={{ color: '#ffffff', borderTop: '3px solid #f7c01d' }}
            >
              DCR MOTORS
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#afb3b6' }}>
              La plataforma líder en sorteos de vehículos premium y gestión exclusiva de superdeportivos en Chile.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" style={{ color: '#afb3b6' }} />
                <span className="text-sm" style={{ color: '#afb3b6' }}>info@dcrmotors.cl</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" style={{ color: '#afb3b6' }} />
                <span className="text-sm" style={{ color: '#afb3b6' }}>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" style={{ color: '#afb3b6' }} />
                <span className="text-sm" style={{ color: '#afb3b6' }}>Santiago, Chile</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: '#ffffff' }}>
              Navegación
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#collection" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  Collection
                </a>
              </li>
              <li>
                <a href="#sales" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  Sales
                </a>
              </li>
              <li>
                <a href="#storage" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  Storage
                </a>
              </li>
              <li>
                <a href="#dcr-hub" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  DCR Hub
                </a>
              </li>
            </ul>

            {/* Legal Links */}
            <h4 className="text-sm font-black uppercase tracking-widest mb-4 mt-8" style={{ color: '#ffffff' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#ffffff] transition-colors duration-200" style={{ color: '#afb3b6' }}>
                  Bases del Sorteo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Form */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: '#ffffff' }}>
              Contáctanos
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-none border-gray-700 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#f7c01d] focus:ring-[#f7c01d]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="rounded-none border-gray-700 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#f7c01d] focus:ring-[#f7c01d]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>

              {/* Phone */}
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono (opcional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="rounded-none border-gray-700 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#f7c01d] focus:ring-[#f7c01d]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>

              {/* Contact Type - FIXED: White background for better readability */}
              <div>
                <select
                  name="contactType"
                  value={formData.contactType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm rounded-none border border-gray-700 text-black focus:border-[#f7c01d] focus:ring-[#f7c01d] focus:outline-none transition-colors"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <option value="general">Consulta General</option>
                  <option value="sales">Venta de Vehículos</option>
                  <option value="storage">Servicio de Storage</option>
                  <option value="dcr-hub">Red de Influencers</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <Textarea
                  name="message"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="rounded-none border-gray-700 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#f7c01d] focus:ring-[#f7c01d] resize-none"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-none font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Enviar Mensaje
                  </span>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 rounded text-sm font-medium" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid #22c55e' }}>
                  ✓ Mensaje enviado correctamente. Te contactaremos pronto.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-3 rounded text-sm font-medium" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444' }}>
                  ✗ Error al enviar. Por favor, inténtalo nuevamente.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8" style={{ borderTop: '1px solid #364049' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left" style={{ color: '#798086' }}>
              © 2026 DCR Motors. Todos los derechos reservados.
            </p>
            <p className="text-xs text-center md:text-right" style={{ color: '#798086' }}>
              Diseñado con pasión por los superdeportivos 🏎️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

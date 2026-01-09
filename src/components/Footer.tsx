import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        contactType: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <footer className="py-16 bg-background" style={{ backgroundColor: '#181f25' }}>
      <div className="container mx-auto px-4">
        {/* Top Section - Brand Info, Navigation, Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#f7c01d' }}>
              DCR MOTORS
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Exclusividad, pasión y adrenalina en cada vehículo de nuestra colección.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: '#f7c01d', color: '#f7c01d' }}>
                  ✓
                </Badge>
                <span>Autenticidad Certificada</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: '#f7c01d', color: '#f7c01d' }}>
                  ✓
                </Badge>
                <span>Soporte Premium</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: '#f7c01d', color: '#f7c01d' }}>
                  ✓
                </Badge>
                <span>Entrega Global</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <a href="#collection" className="text-muted-foreground hover:text-primary text-sm transition-colors" style={{ color: '#798086' }}>
                  Collection
                </a>
              </li>
              <li>
                <a href="#sales" className="text-muted-foreground hover:text-primary text-sm transition-colors" style={{ color: '#798086' }}>
                  Sales
                </a>
              </li>
              <li>
                <a href="#storage" className="text-muted-foreground hover:text-primary text-sm transition-colors" style={{ color: '#798086' }}>
                  Storage
                </a>
              </li>
              <li>
                <a href="#raffles" className="text-muted-foreground hover:text-primary text-sm transition-colors" style={{ color: '#798086' }}>
                  Sorteos
                </a>
              </li>
              <li>
                <a href="#dcr-hub" className="text-muted-foreground hover:text-primary text-sm transition-colors" style={{ color: '#798086' }}>
                  DCR Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground" style={{ color: '#798086' }}>
                <div className="font-semibold text-foreground mb-1">Email</div>
                info@dcrmotors.com
              </li>
              <li className="text-sm text-muted-foreground" style={{ color: '#798086' }}>
                <div className="font-semibold text-foreground mb-1">Teléfono</div>
                +56 9 1234 5678
              </li>
              <li className="text-sm text-muted-foreground" style={{ color: '#798086' }}>
                <div className="font-semibold text-foreground mb-1">Ubicación</div>
                Santiago, Chile
              </li>
              <li className="text-sm text-muted-foreground" style={{ color: '#798086' }}>
                <div className="font-semibold text-foreground mb-1">Horario</div>
                Lun - Vie: 9:00 - 18:00
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Newsletter</h4>
            <p className="text-xs text-muted-foreground mb-4" style={{ color: '#798086' }}>
              Recibe las últimas novedades, sorteos exclusivos y contenido premium directamente en tu correo.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Tu email"
                className="bg-card border-border text-foreground rounded-none"
                style={{ backgroundColor: '#272e35', borderColor: '#364049', color: '#ffffff' }}
              />
              <Button
                className="w-full rounded-none font-semibold"
                style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-t border-border pt-12 mb-8" style={{ borderColor: '#364049' }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground text-center mb-2">
              Contáctanos
            </h3>
            <p className="text-muted-foreground text-center mb-8 text-sm" style={{ color: '#798086' }}>
              Estamos aquí para ayudarte. Completa el formulario y te responderemos a la brevedad.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre *
                  </label>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="bg-card border-border text-foreground rounded-none"
                    style={{ backgroundColor: '#272e35', borderColor: '#364049', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="bg-card border-border text-foreground rounded-none"
                    style={{ backgroundColor: '#272e35', borderColor: '#364049', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-card border-border text-foreground rounded-none"
                    style={{ backgroundColor: '#272e35', borderColor: '#364049', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Consulta *
                  </label>
                  <Select
                    value={formData.contactType}
                    onValueChange={(value) => handleChange('contactType', value)}
                    required
                  >
                    <SelectTrigger
                      className="bg-card border-border text-foreground rounded-none"
                      style={{ backgroundColor: '#272e35', borderColor: '#364049', color: '#ffffff' }}
                    >
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-none" style={{ backgroundColor: '#ffffff' }}>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="dcr-hub">DCR Hub</SelectItem>
                      <SelectItem value="support">Soporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensaje *
                </label>
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  className="bg-card border-border text-foreground rounded-none resize-none"
                  style={{ backgroundColor: '#272e35', borderColor: '#364049', color: '#ffffff' }}
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-none border-2" style={{ backgroundColor: '#22c55e20', borderColor: '#22c55e', color: '#22c55e' }}>
                  ✓ Mensaje enviado exitosamente. Te contactaremos pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-none border-2" style={{ backgroundColor: '#dc262620', borderColor: '#dc2626', color: '#dc2626' }}>
                  ✗ Error al enviar. Por favor intenta nuevamente.
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-none font-semibold"
                style={{ backgroundColor: '#f7c01d', color: '#181f25' }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Copyright & Social */}
        <div className="border-t border-border pt-8" style={{ borderColor: '#364049' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm" style={{ color: '#798086' }}>
              © 2026 DCR Motors. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors" style={{ color: '#798086' }}>
                Privacidad
              </a>
              <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors" style={{ color: '#798086' }}>
                Términos
              </a>
              <a href="#cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors" style={{ color: '#798086' }}>
                Cookies
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: '#f7c01d', color: '#f7c01d' }}>
                Powered by Tugana
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

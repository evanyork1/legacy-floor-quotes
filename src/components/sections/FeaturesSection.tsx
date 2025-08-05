import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { Layers, Building, Sparkles, Users, Shield, Headphones, ArrowRight, Phone, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
const FeaturesSection = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDFW = location.pathname === '/dfw' || location.pathname === '/dfwreslanding';
  const isCommercial = location.pathname === '/dfwcommercial';
  const isHouston = location.pathname === '/houston' || location.pathname === '/houstonreslanding';
  const features = isCommercial ? [{
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Concrete Polishing",
    description: "Professional concrete polishing for warehouses, restaurants, retail stores, and manufacturing facilities. High-gloss, durable finishes that withstand heavy commercial traffic.",
    image: "/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png"
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Industrial Epoxy",
    description: "Heavy-duty epoxy systems engineered for commercial environments including airplane hangars, distribution centers, food processing plants, and automotive facilities.",
    image: "/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png"
  }, {
    icon: <Layers className="h-8 w-8 text-blue-600" />,
    title: "Specialty Coatings",
    description: "Custom commercial flooring solutions including anti-static, chemical-resistant, and FDA-compliant coatings for specialized industrial applications.",
    image: "/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png"
  }] : isDFW || isHouston ? [{
    icon: <Layers className="h-8 w-8 text-blue-600" />,
    title: "Flake Floors",
    description: "Our standard product is a Polyurea flake floor system. This is a Lifetime Warrantied product that has been perfected with science to look great and perform for years to come.",
    image: "/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png"
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Industrial Epoxy",
    description: "Cutting edge epoxy materials are now available for industrial applications such as airplane hangars, warehouses, restaurants, and more.",
    image: "/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png"
  }, {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Concrete Polishing",
    description: "Concrete polishing is ideal for commercial spaces such as warehouses, restaurants, retail stores, and more. Durable finishes that offer a great looking result.",
    image: "/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png"
  }] : [{
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Certified Installers",
    description: "Only certified, insured professionals in our network"
  }, {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Lifetime Warranty",
    description: "Industry-leading protection with comprehensive coverage"
  }, {
    icon: <Headphones className="h-8 w-8 text-blue-600" />,
    title: "World Class Service",
    description: "Choose what works best for you - virtual consultations or meet with our experts on-site. No need to take time out of your day unless you prefer the personal touch."
  }];
  const sectionTitle = isCommercial ? "Commercial & Industrial Flooring Solutions" : isDFW || isHouston ? "Premium Polyurea, Epoxy, and Polished Floors" : "Why Choose Legacy Industrial Coatings?";
  return;
};
export default FeaturesSection;
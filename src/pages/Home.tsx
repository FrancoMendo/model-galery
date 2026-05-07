/**
 * Página de inicio - Muestra todas las producciones fotográficas
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductionCard from "../components/productions/ProductionCard";
import Header from "../components/layout/Header";

const API_URL = "https://api-model-gallery-production.francomendodev.workers.dev";

export const Home = () => {
  const navigate = useNavigate();
  const [productions, setProductions] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const res = await fetch(`${API_URL}/productions`);
        const data = await res.json();

        // Mapear los datos de la API para asegurar que la imagen tenga la URL completa
        const mappedProductions = (data.productions || []).map((p: any) => ({
          ...p,
          category: p.category || "General", // Fallback por si no tienes categoría en BD
          coverImage: p.coverImage
            ? `${API_URL}${p.coverImage}`
            : "https://via.placeholder.com/400x600?text=Sin+Imagen",
        }));

        setProductions(mappedProductions);
      } catch (error) {
        console.error("Error al obtener producciones:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductions();
  }, []);

  // Obtener categorías únicas
  const categories = ["all", ...Array.from(new Set(productions.map(p => p.category)))];

  // Filtrar producciones por categoría
  const filteredProductions = productions.filter((prod) => {
    return selectedCategory === "all" || prod.category === selectedCategory;
  });

  const handleProductionClick = (productionId: string) => {
    navigate(`/production/${productionId}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9f7",
      }}
    >
      {/* Header/Navbar */}
      <Header />

      {/* Filtros y búsqueda */}
      <div
        style={{
          padding: "0 20px",
          marginTop: "24px",
        }}
      >
        {/* Selector de categorías */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: selectedCategory === category ? "1px solid #467e03" : "1px solid #d1d5cc",
                backgroundColor: selectedCategory === category ? "#467e03" : "white",
                color: selectedCategory === category ? "white" : "#5a5a52",
                fontSize: "13px",
                fontWeight: selectedCategory === category ? "600" : "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textTransform: "capitalize",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = "#467e03";
                  e.currentTarget.style.backgroundColor = "#f5f8f2";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = "#d1d5cc";
                  e.currentTarget.style.backgroundColor = "white";
                }
              }}
            >
              {category === "all" ? "Todas" : category}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
        <div
          style={{
            marginBottom: "20px",
            fontSize: "14px",
            color: "#9fa499",
            fontWeight: "500",
          }}
        >
          {filteredProductions.length}{" "}
          {filteredProductions.length === 1 ? "producción" : "producciones"}
        </div>

        {/* Grid de producciones */}
        {filteredProductions.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "32px",
              paddingBottom: "60px",
            }}
          >
            {filteredProductions.map((production) => (
              <ProductionCard
                key={production.id}
                production={production}
                onClick={() => handleProductionClick(production.id)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9fa499",
            }}
          >
            <p style={{ fontSize: "18px" }}>No se encontraron producciones</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "white",
          borderTop: "1px solid #e3e6df",
          padding: "40px 20px",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            textAlign: "center",
            color: "#707066",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px" }}>
            © {new Date().getFullYear()} Model Gallery. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

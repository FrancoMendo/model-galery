/**
 * Página de inicio - Muestra todas las producciones fotográficas
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Production } from "../types/production.types";
import { getAllProductions } from "../data/productions.data";
import ProductionCard from "../components/productions/ProductionCard";
import Header from "../components/layout/Header";

export const Home = () => {
  const navigate = useNavigate();
  const [productions, setProductions] = useState<Production[]>([]);

  useEffect(() => {
    const allProductions = getAllProductions();
    setProductions(allProductions);
  }, []);

  const filteredProductions = productions;

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
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "32px",
            alignItems: "center",
          }}
        ></div>
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

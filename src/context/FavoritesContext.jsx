import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "foodiehub-saved-recipes";
const CHANGE_EVENT = "foodiehub-favorites-updated";

function readSavedRecipeIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(parsed)) return [];

    return [
      ...new Set(
        parsed.map(Number).filter((id) => Number.isFinite(id))
      ),
    ];
  } catch {
    return [];
  }
}

function writeSavedRecipeIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Unable to save favorites:", error);
  }
}

export function FavoritesProvider({ children }) {
  const [savedRecipeIds, setSavedRecipeIds] = useState(
    readSavedRecipeIds
  );

  useEffect(() => {
    const syncFavorites = () => {
      setSavedRecipeIds(readSavedRecipeIds());
    };

    const syncStorage = (event) => {
      if (!event.key || event.key === STORAGE_KEY) {
        syncFavorites();
      }
    };

    window.addEventListener(CHANGE_EVENT, syncFavorites);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncFavorites);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  function toggleFavorite(recipeId) {
    const id = Number(recipeId);

    if (!Number.isFinite(id)) return false;

    const currentIds = readSavedRecipeIds();
    const wasSaved = currentIds.includes(id);

    const nextIds = wasSaved
      ? currentIds.filter((savedId) => savedId !== id)
      : [...currentIds, id];

    writeSavedRecipeIds(nextIds);
    setSavedRecipeIds(nextIds);

    window.dispatchEvent(new Event(CHANGE_EVENT));

    return !wasSaved;
  }

  function removeFavorite(recipeId) {
    const id = Number(recipeId);

    const nextIds = readSavedRecipeIds().filter(
      (savedId) => savedId !== id
    );

    writeSavedRecipeIds(nextIds);
    setSavedRecipeIds(nextIds);

    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  function isFavorite(recipeId) {
    return savedRecipeIds.includes(Number(recipeId));
  }

  return (
    <FavoritesContext.Provider
      value={{
        savedRecipeIds,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside a FavoritesProvider."
    );
  }

  return context;
}
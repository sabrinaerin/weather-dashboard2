import React, { useState, useEffect } from 'react';

const SearchBar = ({ onCitySelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

    const fetchSuggestions = async () => {
        try {
            if (query.trim() === "") {
                setSuggestions([]);
                return;
            }

            const response = await fetch(`http://localhost:5000/api/locations?query=${query}`);
            if (!response.ok) {
                throw new Error("Failed to fetch suggestions");
            }

            const data = await response.json();
            setSuggestions(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, [query]);

    const handleCityClick = (city) => {
        setQuery(city.name); 
        setSuggestions([]); // Clear suggestions
        onCitySelect(city); 
    };

    if (error) return <p>{error}</p>;

    return (
        <div style={{ textAlign: "center", margin: "20px auto" }}>
            <input
                type="text"
                placeholder="Search city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="search-input"
                style={{
                    width: "300px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            {suggestions.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        width: "300px",
                        margin: "0 auto",
                        left: "0",
                        right: "0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        zIndex: 1000,
                        textAlign: "left",
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleCityClick(suggestion)} 
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#f5f5f5")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                            }
                        >
                            {suggestion.name}, {suggestion.state}, {suggestion.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

import React, { useState, useEffect } from 'react';

function CMSContent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.CMS_URL + 'api/homecms');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                {/* Your motion graphics or spinner here */}
                <div className="spinner">Loading...</div>
            </div>
        );
    }

    if (!pageData) {
        return <p>No data found.</p>;
    }

    return (
        <div>
            <section>
                <h1>{pageData.page_name}</h1>
                <p>{pageData.about_section.description1}</p>
                <p>{pageData.about_section.description2}</p>
            </section>

            <section>
                <h2>Testimonials</h2>
                {pageData.testimonials.map((t) => (
                    <div key={t._id}>
                        <strong>{t.name}</strong> ({t.designation}): "{t.description}" – {t.stars}★
                    </div>
                ))}
            </section>

            <section>
                <h2>Stats</h2>
                <ul>
                    <li>Design Projects Completed: {pageData.design_projects_completed}</li>
                    <li>Client Satisfaction Rate: {pageData.Client_satisfaction_rate}%</li>
                    <li>Years of Experience: {pageData.years_of_experience}</li>
                </ul>
            </section>

            <section>
                <h2>Partners</h2>
                {pageData.partners.map((p) => (
                    <div key={p._id}>
                        <img src={`/images/${p.logo}`} alt={p.name} width="100" />
                        <span>{p.name}</span>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default HomePage;
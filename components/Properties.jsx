"use client";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import LoadingSpinner from "@/assets/loading-spinner.svg";
import Image from "next/image";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch("/api/properties");

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await res.json();
                setProperties(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return loading ? (
        <Image src={LoadingSpinner} width={200} height={200} alt="Loading..." />
    ) : (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6"></div>
            {properties.length === 0 ? (
                <p>No properties found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Properties;
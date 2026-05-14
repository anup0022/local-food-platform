"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Navigation,
  Search,
  Loader2,
  Store,
  TreesIcon,
  ShoppingBasket,
} from "lucide-react";

interface FoodSource {
  id: string;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  type: string;
  image: string | null;
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [sources, setSources] = useState<FoodSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<FoodSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [search, setSearch] = useState("");

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setLocationError(
            "Unable to get your location. Please enable location services."
          );
          // Default to a central location
          setUserLocation({ lat: 20.5937, lng: 78.9629 }); // India center
          setLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setUserLocation({ lat: 20.5937, lng: 78.9629 });
      setLoading(false);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      // Show a placeholder map experience without Google Maps API
      return;
    }

    const initMap = async () => {
      const { Loader } = await import("@googlemaps/js-api-loader");
      const loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places"],
      });

      // @ts-expect-error - Loader API varies by version
      await (loader.importLibrary ? loader.importLibrary("maps") : loader.load());
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: userLocation,
        zoom: 12,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      });

      // User marker
      new google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#4CAF50",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
        title: "You are here",
      });

      setMap(mapInstance);
    };

    initMap();
  }, [userLocation]);

  // Fetch food sources
  useEffect(() => {
    if (!userLocation) return;

    const fetchSources = async () => {
      try {
        const res = await fetch(
          `/api/location/sources?lat=${userLocation.lat}&lng=${userLocation.lng}`
        );
        if (res.ok) {
          const data = await res.json();
          setSources(data);
        }
      } catch (error) {
        console.error("Failed to fetch sources:", error);
      }
    };

    fetchSources();
  }, [userLocation]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "farm":
        return <TreesIcon className="h-4 w-4 text-green-600" />;
      case "market":
        return <ShoppingBasket className="h-4 w-4 text-orange-600" />;
      case "store":
        return <Store className="h-4 w-4 text-blue-600" />;
      default:
        return <MapPin className="h-4 w-4 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "farm":
        return "Farm";
      case "market":
        return "Market";
      case "store":
        return "Store";
      case "restaurant":
        return "Restaurant";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MapPin className="h-7 w-7 text-primary" />
          Find Local Food Near You
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover farms, markets, and stores selling fresh local produce
        </p>
      </div>

      {locationError && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md text-sm text-orange-700">
          {locationError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div
              ref={mapRef}
              className="w-full h-[500px] rounded-lg border bg-muted flex items-center justify-center"
            >
              {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">
                    Map Preview
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your Google Maps API key to enable interactive maps
                  </p>
                  {userLocation && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Your location: {userLocation.lat.toFixed(4)},{" "}
                      {userLocation.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Location button */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-4 right-4 shadow-md"
              onClick={() => {
                if (map && userLocation) {
                  map.panTo(userLocation);
                  map.setZoom(14);
                }
              }}
            >
              <Navigation className="h-4 w-4 mr-1" />
              My Location
            </Button>
          </div>
        </div>

        {/* Sidebar - Sources List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search food sources..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              All
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Farms
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Markets
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Stores
            </Badge>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {sources.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No food sources found nearby.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Food sources will appear here once added by the community.
                  </p>
                </CardContent>
              </Card>
            ) : (
              sources
                .filter(
                  (s) =>
                    !search ||
                    s.name.toLowerCase().includes(search.toLowerCase()) ||
                    s.address.toLowerCase().includes(search.toLowerCase())
                )
                .map((source) => (
                  <Card
                    key={source.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedSource?.id === source.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedSource(source)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getTypeIcon(source.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
                              {source.name}
                            </p>
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {getTypeLabel(source.type)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {source.address}
                          </p>
                          {source.phone && (
                            <p className="text-xs text-primary mt-1">
                              {source.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

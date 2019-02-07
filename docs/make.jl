using Documenter, Amoebas

makedocs(
    sitename = "Amoebas.jl",
    pages = [
        "Introduction" => "index.md",
        "Amoeba" => "amoeba.md",
        "Spine" => "spine.md",
        "Contour" => "contour.md",
        "Coamoeba" => "coamoeba.md",
        "Imaginary Projection" => "imaginary.md",
        "Reference" => "reference.md"
    ]
)

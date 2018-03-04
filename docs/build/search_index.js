var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Amoebas.jl-1",
    "page": "Introduction",
    "title": "Amoebas.jl",
    "category": "section",
    "text": "Amoebas.jl is a package to compute and visualize the amoeba, coamoeba and imaginary projection of bi- and trivariate polynomials as well as the contour and the spine of an two-dimensional amoeba."
},

{
    "location": "index.html#Getting-started-1",
    "page": "Introduction",
    "title": "Getting started",
    "category": "section",
    "text": "To construct polynomials we export the macro @polyvar from the DynamicPolynomials.jl package.using Amoebas\n# Create variables\n@polyvar x y\n# construct a polynomial\nf = x^2*y + y^2 + 3x^2*y^3 + y^4 + x^4*y^4To compute the amoeba of f we then can simply doA = amoeba(f)To visualize the amoeba we use the plotting capabilities provided by Plots.jl. Just dousing Plots\n\nplot(A)and you obtain (Image: amoeba text)"
},

{
    "location": "amoeba.html#",
    "page": "Amoeba",
    "title": "Amoeba",
    "category": "page",
    "text": ""
},

{
    "location": "amoeba.html#Amoebas.amoeba",
    "page": "Amoeba",
    "title": "Amoebas.amoeba",
    "category": "Function",
    "text": "amoeba(f; alg=Polygonal(), options...)\n\nCompute the amoeba of f with the given algorithm alg which can be\n\nPolygonal()\nGreedy()\nArchTrop()\nSimple()\n\nbut you probably only want to use Polygonal() or Greedy().\n\nDepending on the given algorithm the function takes different keyword arguments.\n\nExamples\n\n@polyvar x y\n\n# This uses the `Polygonal()` algorithm\namoeba(x^2 + y^2 + 1)\n\n# We only want a crude approximation\namoeba(x^2 + y^2 + 1, accuracy=0.1)\n\n# Use the `Greedy()` algorithm.\namoeba(x^2 + y^2 + 1, alg=Greedy())\n\n# Use the `Greedy()` algorithm with a custom grid.\ngrid = Grid2D(xlims=(-5, 5), ylims=(-4, 4), res=(500, 400))\namoeba(x^2 + y^2 + 1, alg=Greedy(), grid=grid)\n\n# Use the `Greedy()` algorithm with the default domain but a higher resolution\namoeba(x^2 + y^2 + 1, alg=Greedy(), resolution=800)\n\nPolygonal()\n\nThis algorithm computes an approximation of the amoeba 𝒜(𝑓) in the provided domain Ω by computing a set of polygons 𝒫 with |𝒫| ⊂ Ω such that the union of these polygons approximates 𝒜(𝑓) ∩ Ω from the outside.\n\nThe possible (optional) arguments are\n\ndomain: A tuple in the form (xmin, xmax, ymin, ymax) which defines a section Ω\n\nfor which the amoeba 𝒜(𝑓) is computed. This domain has to be such that the intersection Ω ∩ 𝒜(𝑓) still captures the correct topology of 𝒜(𝑓).\n\naccuracy=0.01: The maximal allowed error |𝒫 - 𝒜(𝑓) ∩ Ω|. Note that we only compute an upper limit of the error.\n\nThe algorithms stops if the given accuracy is reached.\n\nspine: This algorithm needs the spine of 𝒜(𝑓).\nminimal_component_size=0.01: The minimal size of the components of the complement. This is only used if no spine\n\nis passed explicitly.\n\niterations=2000: The maximal number of iterations.\nvertices_accuracy=accuracy*1e-3: During the algorithm we approximate points on the boundary of 𝒜(𝑓). This\n\nis the accuracy with which we compute them. Note hat this influences the minimal error of the approximation and it should always be some magnitudes smaller than accuracy.\n\nmembership_options=[MembershipTestOptions()](@ref): As a subroutine a membership test is used.\n\nGreedy(), Simple(), ArchTrop()\n\nThese algorithms are all approximations of the amoeba 𝒜(𝑓) based on a grid. This basically applies the membership test for different grid points. Greedy() is the fastest and Simple() the slowest. The grid can be passed explicitly, otherwise it will be computed based on a heuristic.\n\nresolution=600: The resolution of the grid if not passed explicitly.\ngrid: If passed explicitly this grid is used, otherwise it will be computed based on a heuristic.\nmembership_options=[MembershipTestOptions()](@ref): The options for the membership test.\n\n\n\n"
},

{
    "location": "amoeba.html#Amoeba-1",
    "page": "Amoeba",
    "title": "Amoeba",
    "category": "section",
    "text": "The amoeba mathcalA() of a Laurent polynomial f in mathbbCz_1^pm ldots z_n^pm is the image of the non-singular hypersurface mathcalV(f) subset (mathbbC^*)^n under the Log-absolute value map given byoperatornameLogcdot (mathbbC^*)^n rightarrow mathbbR^n quad (z_1 ldots z_n) mapsto (logz_1 ldots logz_n) It was first introduced by Gelfand, Kapranov and Zelevinsky in their book Discriminants, Resultants, and Multidimensional Determinants in 1994.amoeba"
},

{
    "location": "spine.html#",
    "page": "Spine",
    "title": "Spine",
    "category": "page",
    "text": ""
},

{
    "location": "spine.html#Amoebas.spine",
    "page": "Spine",
    "title": "Amoebas.spine",
    "category": "Function",
    "text": "spine(f::MP.AbstractPolynomial; options...)\n\nCompute the spine of the amoeba 𝒜(𝑓). This algorithm computes first an approximation of 𝒜(𝑓) and from this the spine. Returns a Spine2D.\n\nExample\n\n@polyvar x y\n# use all the defaults\nspine(x^2 + y^2 + 1)\n\n# Maybe we think that the compleement of the amoeba has some very small components\n# and we want to use an explicit domain\nspine(x^2 + y^2 + 1, domain=(-5, 5, -5, 5), minimal_component_size=0.001)\n\nOptional arguments:\n\nminimal_component_size=0.01: A guarantee that in each component of the complement of 𝒜(𝑓) fits a ball with this diameter.\n\nIf this does not hold the algorithm can return a wrong result.\n\ndomain: A tuple in the form (xmin, xmax, ymin, ymax) which defines a section Ω\n\nfor which the amoeba 𝒜(𝑓) is computed. This domain has to be such that the intersection Ω ∩ 𝒜(𝑓) still captures the correct topology of 𝒜(𝑓).\n\ngrid: Based on minimal_component_size and domain a grid can be computed automatically.\n\nThis can also be overwritten with this option.\n\nmembership_options=[MembershipTestOptions](@ref)(): Options for the membership test.\nnsamples=1024: For the computation we numerically evaluate intergrals. This is the number\n\nof sample points used in the computation.\n\nspine(f::MP.AbstractPolynomial, A::Bitmap2D; nsamples=1024)\n\nCompute the spine based on the given amoeba approximation A.\n\n\n\nspine(A::PolygonalAmoeba)\n\nThe spine which was used to compute A.\n\n\n\n"
},

{
    "location": "spine.html#Amoebas.Spine2D",
    "page": "Spine",
    "title": "Amoebas.Spine2D",
    "category": "Type",
    "text": "A Spine2D represents the spine of a two-dimensional amoeba. This also contains informations about the components of the complement and the approximation used to obtain this spine.\n\n\n\n"
},

{
    "location": "spine.html#Amoebas.ComponentComplement",
    "page": "Spine",
    "title": "Amoebas.ComponentComplement",
    "category": "Type",
    "text": "Represents a component of the complement of the amoeba. It contains information about the order of the component, whether it is bounded and one point out of the component.\n\n\n\n"
},

{
    "location": "spine.html#Amoebas.components_complement-Tuple{Amoebas.Spine2D}",
    "page": "Spine",
    "title": "Amoebas.components_complement",
    "category": "Method",
    "text": "components_complement(S::Spine2D)\n\nGet the ComponentComplement of the spine S.\n\n\n\n"
},

{
    "location": "spine.html#Amoebas.ronkin_polynomial-Tuple{Amoebas.Spine2D}",
    "page": "Spine",
    "title": "Amoebas.ronkin_polynomial",
    "category": "Method",
    "text": "ronkin_polynomial(S::Spine2D)\n\nGet the tropical polynomial which defines this hypersurface.\n\n\n\n"
},

{
    "location": "spine.html#Amoebas.hypersurface-Tuple{Amoebas.Spine2D}",
    "page": "Spine",
    "title": "Amoebas.hypersurface",
    "category": "Method",
    "text": "hypersurface(S::Spine2D)\n\nGet the tropical curve which describes the spine.\n\n\n\n"
},

{
    "location": "spine.html#Amoebas.amoeba_approximation-Tuple{Amoebas.Spine2D}",
    "page": "Spine",
    "title": "Amoebas.amoeba_approximation",
    "category": "Method",
    "text": "amoeba_approximation(S::Spine2D)\n\nGet the approximated amoeba used to compute the spine.\n\n\n\n"
},

{
    "location": "spine.html#Spine-1",
    "page": "Spine",
    "title": "Spine",
    "category": "section",
    "text": "spine\nSpine2D\nComponentComplement\ncomponents_complement(::Spine2D)\nronkin_polynomial(::Spine2D)\nhypersurface(::Spine2D)\namoeba_approximation(::Spine2D)"
},

{
    "location": "contour.html#",
    "page": "Contour",
    "title": "Contour",
    "category": "page",
    "text": ""
},

{
    "location": "contour.html#Amoebas.contour",
    "page": "Contour",
    "title": "Amoebas.contour",
    "category": "Function",
    "text": "contour(f; options...)\n\nCompute the contour 𝐶(𝑓) of the amoeba 𝒜(𝑓).\n\nExample\n\n@polyvar x y\n\ncontour(x^2+y^2+1)\n\n# custom domain\ncontour(x^2+y^2+1, domain=(-5, 5, -5, 5))\n\nOptions\n\ndomain: A tuple in the form (xmin, xmax, ymin, ymax) which defines a section Ω\n\nfor which the contour 𝐶(𝑓) is computed.\n\nmembership_options: The options for the membership test\nres=(600,600): The resolution with which starting points are sampled\nsamples_off_axis=2*MP.maxdegree(p)^2: The number of sample points per off-axis.\n\n\n\n"
},

{
    "location": "contour.html#Amoebas.Contour2D",
    "page": "Contour",
    "title": "Amoebas.Contour2D",
    "category": "Type",
    "text": "Contour2D\n\nRepresents a contour of a two-dimensional amoeba.\n\n\n\n"
},

{
    "location": "contour.html#Contour-1",
    "page": "Contour",
    "title": "Contour",
    "category": "section",
    "text": "contour\nContour2D"
},

{
    "location": "coamoeba.html#",
    "page": "Coamoeba",
    "title": "Coamoeba",
    "category": "page",
    "text": ""
},

{
    "location": "coamoeba.html#Amoebas.coamoeba",
    "page": "Coamoeba",
    "title": "Amoebas.coamoeba",
    "category": "Function",
    "text": "coamoeba(f; alg=Greedy(), options...)\n\nCompute the coamoeba of f with the given algorithm alg which can be\n\nGreedy()\nCoarse()\nSimple()\n\nbut you probably only want to use Greedy() or Coarse.\n\nThe coamoeba is embedded in 0 2)^n where n is either 2 or 3 depending on the polynomial. The algorithm approximate the coamoeba on a grid representing this embedding.\n\nExample\n\n@polyvar x y\n\n# This uses the `Greedy()` algorithm\ncoamoeba(x^2 + y^2 + 1)\n\nOptional arguments\n\nresolution=600: The resolution of the grid if not passed explicitly.\nmembership_options=[MembershipTestOptions()](@ref): The options for the membership test.\ntest_domain: Tuple (xmin, xmax, ymin, ymax) resp. (xmin, xmax, ymin, ymax, zmin, zmax)\n\nfrom which start values for the membership test are drawn if necessary.\n\n\n\n"
},

{
    "location": "coamoeba.html#Amoebas.Coamoeba",
    "page": "Coamoeba",
    "title": "Amoebas.Coamoeba",
    "category": "Type",
    "text": "Coamoeba{N}\n\nHolding a BitArray represeting the coamoeba embedded in 02^N.\n\n\n\n"
},

{
    "location": "coamoeba.html#Coamoeba-1",
    "page": "Coamoeba",
    "title": "Coamoeba",
    "category": "section",
    "text": "coamoeba\nCoamoeba"
},

{
    "location": "imaginary.html#",
    "page": "Imaginary Projection",
    "title": "Imaginary Projection",
    "category": "page",
    "text": ""
},

{
    "location": "imaginary.html#Amoebas.imaginary_projection",
    "page": "Imaginary Projection",
    "title": "Amoebas.imaginary_projection",
    "category": "Function",
    "text": "imaginary_projection(f; alg=Greedy(), options...)\n\nCompute the imaginary_projection of f with the given algorithm alg which can be\n\nGreedy()\nSimple()\n\nbut you probably only want to use Greedy().\n\nExamples\n\n@polyvar x y\n\n# This uses the `Greedy()` algorithm\namoeba(x^2 + y^2 + 1)\n\n# Use the `Greedy()` algorithm with a custom grid.\ngrid = Grid2D(xlims=(-5, 5), ylims=(-4, 4), res=(500, 400))\namoeba(x^2 + y^2 + 1, alg=Greedy(), grid=grid)\n\n# Use the `Greedy()` algorithm  with the default domain but a higher resolution\namoeba(x^2 + y^2 + 1, alg=Greedy(), resolution=800)\n\nThese algorithms are all approximations of the imaginary projection 𝐼(𝑓) based on a grid. This basically applies the membership test for different grid points. The grid can be passed explicitly, otherwise it will be computed based on a heuristic.\n\nresolution=1000: The resolution of the grid if not passed explicitly. If the Greedy() algorithm is\n\nused then a higher resolution can improve the image quality substantially.\n\ngrid: If passed explicitly this grid is used, otherwise it will be computed based on a heuristic.\nmembership_options=[MembershipTestOptions()](@ref): The options for the membership test.\nnpasses=1: The Greedy() algorithm can make multiple passes to improve the quality.\n\n\n\n"
},

{
    "location": "imaginary.html#Imaginary-Projection-1",
    "page": "Imaginary Projection",
    "title": "Imaginary Projection",
    "category": "section",
    "text": "imaginary_projection"
},

{
    "location": "reference.html#",
    "page": "Reference",
    "title": "Reference",
    "category": "page",
    "text": ""
},

{
    "location": "reference.html#Reference-1",
    "page": "Reference",
    "title": "Reference",
    "category": "section",
    "text": ""
},

{
    "location": "reference.html#Amoebas.Grid2D",
    "page": "Reference",
    "title": "Amoebas.Grid2D",
    "category": "Type",
    "text": "A structure representing a 2D Grid.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.Grid3D",
    "page": "Reference",
    "title": "Amoebas.Grid3D",
    "category": "Type",
    "text": "A structure representing a 3D Grid.\n\n\n\n"
},

{
    "location": "reference.html#Grid-1",
    "page": "Reference",
    "title": "Grid",
    "category": "section",
    "text": "Grid2D\nGrid3D"
},

{
    "location": "reference.html#Amoebas.membershiptest",
    "page": "Reference",
    "title": "Amoebas.membershiptest",
    "category": "Function",
    "text": "membershiptest(F::AbstractFiber{T}, w:, options=MembershipTestOptions()) where T\n\nCheck wether the point w is contained in the fiber F. The tests uses Newton\'s method with configuration provided by options. Returns a MembershipTestResult.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.MembershipTestOptions",
    "page": "Reference",
    "title": "Amoebas.MembershipTestOptions",
    "category": "Type",
    "text": "MembershipTestOptions(iterations=50, ntries=30, tol=1e-7)\n\nDetails\n\niterations The maximal number of iterations in one try.\nntries The number of times Newton\'s method will be tried\ntol The desired accuracy when Newton\'s method converges.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.MembershipTestResult",
    "page": "Reference",
    "title": "Amoebas.MembershipTestResult",
    "category": "Type",
    "text": "MembershipTestResult{T, N}\n\nFields\n\nsuccessfull::Bool\ntries::Int The number of times Newton\'s method was started\nconverged_iterations::Int Number iterations needed in a successfull iteration. If the test was not successfull imax is the maximal number of iterations.\nstartvalue::SVector{N, T} The start value of the successfull iteration. Otherwise a random value.\nsolution::SVector{N, T} The solution value of the successfull iteration. Otherwise a random value.\n\n\n\n"
},

{
    "location": "reference.html#Membership-test-1",
    "page": "Reference",
    "title": "Membership test",
    "category": "section",
    "text": "membershiptest\nMembershipTestOptions\nMembershipTestResult"
},

{
    "location": "reference.html#Amoebas.NewtonPolygon",
    "page": "Reference",
    "title": "Amoebas.NewtonPolygon",
    "category": "Type",
    "text": "NewtonPolygon\n\nRepresentation of a Newton polygon of a polynomial.\n\nFields\n\npolynomial::P: the polynomial from which the NewtonPolygon was constructed.\nlattices::Vector{SVector{2,Int}}: the support of the polynomial p.\nvertices::Vector{Int}: the vertex indicdes of the Newton polygon.\nfacets::Vector{SVector{2,Int}}: the facets of the Newton polygon, i.e. it\'s convex hull.\nsubdivision::Vector{SVector{3,Int}}: the simplices of the regular subdivision of the\n\nNewton polygon\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.newtonpolygon",
    "page": "Reference",
    "title": "Amoebas.newtonpolygon",
    "category": "Function",
    "text": "newtonpolygon(p::AbstractPolynomial; lowerhull=false)\n\nConstruct a NewtonPolygon from the support of the polynomial p. lowerhull indicates whether the lower or upper convex hull should be used to construct the regular subdivision of the Newton polygon.\n\n\n\n"
},

{
    "location": "reference.html#Newton-polygon-1",
    "page": "Reference",
    "title": "Newton polygon",
    "category": "section",
    "text": "NewtonPolygon\nnewtonpolygon"
},

{
    "location": "reference.html#Amoebas.AmoebaFiber2D",
    "page": "Reference",
    "title": "Amoebas.AmoebaFiber2D",
    "category": "Type",
    "text": "An AmoebaFiber2D is a representation of the fiber of the amoeba mathcalA_f at (w_1w_2) where f is a bivariate polynomial.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.AmoebaFiber3D",
    "page": "Reference",
    "title": "Amoebas.AmoebaFiber3D",
    "category": "Type",
    "text": "An AmoebaFiber3D is a representation of the fiber of the amoeba mathcalA_f at (w_1 w_2 w_3) where f is a trivariate polynomial.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.ContourFiber2D",
    "page": "Reference",
    "title": "Amoebas.ContourFiber2D",
    "category": "Type",
    "text": "An ContourFiber2D is a representation of the fiber of the contour of the amoeba mathcalA^prime_f at (w_1 w_2) along a onedimensional affine subspace where f is a bivariate polynomial.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.CoamoebaFiber2D",
    "page": "Reference",
    "title": "Amoebas.CoamoebaFiber2D",
    "category": "Type",
    "text": "An CoamoebaFiber2D is a representation of the fiber of the coamoeba mathcalA^prime_f at (_1 _2) where f is a bivariate polynomial.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.CoamoebaFiber3D",
    "page": "Reference",
    "title": "Amoebas.CoamoebaFiber3D",
    "category": "Type",
    "text": "CoamoebaFiber3D(f::AbstractPolynomial, θ=(0., 0., 0.))\n\nConstruct the fiber CoamoebaFiber3D of the trivariate polynomial f at θ.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.ImaginaryFiber2D",
    "page": "Reference",
    "title": "Amoebas.ImaginaryFiber2D",
    "category": "Type",
    "text": "ImaginaryFiber2D(f, y=(0., 0.))\n\nConstruct the fiber ImaginaryFiber2D of the bivariate polynomial f at y.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.ImaginaryFiber3D",
    "page": "Reference",
    "title": "Amoebas.ImaginaryFiber3D",
    "category": "Type",
    "text": "ImaginaryFiber2D(f, y=(0., 0., 0.))\n\nConstruct the fiber ImaginaryFiber3D of the trivariate polynomial f at y.\n\n\n\n"
},

{
    "location": "reference.html#Fibers-1",
    "page": "Reference",
    "title": "Fibers",
    "category": "section",
    "text": "AmoebaFiber2D\nAmoebaFiber3D\nContourFiber2D\nCoamoebaFiber2D\nCoamoebaFiber3D\nImaginaryFiber2D\nImaginaryFiber3D"
},

{
    "location": "reference.html#Amoebas.amoeba_carcase_domain_heuristic",
    "page": "Reference",
    "title": "Amoebas.amoeba_carcase_domain_heuristic",
    "category": "Function",
    "text": "amoeba_carcase_domain_heuristic(f; factor=1.5, aspect_ratio=:default)\n\nCompute the boundary (xmin, xmax, ymin, ymax) of domain Ω such that Ω ∩ Amoeba(f) is probably the carcase of Amoeba(f).\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.archimedean_tropical_curve",
    "page": "Reference",
    "title": "Amoebas.archimedean_tropical_curve",
    "category": "Function",
    "text": "archimedean_tropical_curve(f)\n\nCompute the curve associated to the Archimedean tropical polynomial of f.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.TropicalCurve",
    "page": "Reference",
    "title": "Amoebas.TropicalCurve",
    "category": "Type",
    "text": "A TropicalCurve is a tropical hypersurface of a bivariate polynomial.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.vertices-Tuple{Amoebas.TropicalCurve}",
    "page": "Reference",
    "title": "Amoebas.vertices",
    "category": "Method",
    "text": "vertices(tropicalcurve)\n\nThe vertices of the tropical curve.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.segments-Tuple{Amoebas.TropicalCurve}",
    "page": "Reference",
    "title": "Amoebas.segments",
    "category": "Method",
    "text": "segments(tropicalcurve)\n\nThe segments of the tropical curve. Each segment is a SVector{2} with start and end coordinates.\n\n\n\n"
},

{
    "location": "reference.html#Amoebas.halfrays-Tuple{Amoebas.TropicalCurve}",
    "page": "Reference",
    "title": "Amoebas.halfrays",
    "category": "Method",
    "text": "halfrays(tropicalcurve)\n\nThe halfrays of the tropical curve. Each halfray is a tuple (coordinate, direction).\n\n\n\n"
},

{
    "location": "reference.html#Tropical-geometry-1",
    "page": "Reference",
    "title": "Tropical geometry",
    "category": "section",
    "text": "amoeba_carcase_domain_heuristic\narchimedean_tropical_curve\nTropicalCurve\nvertices(::TropicalCurve)\nsegments(::TropicalCurve)\nhalfrays(::TropicalCurve)"
},

]}

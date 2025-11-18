# Generic black shadows (sorted by size for proper matching)
s/box-shadow: 0 3px 10px rgba(0, 0, 0, 0\.05);/box-shadow: $shadow-xs;/g
s/box-shadow: 0 10px 40px rgba(0, 0, 0, 0\.08);/box-shadow: $shadow-lg;/g
s/box-shadow: 0 4px 12px rgba(0,0,0,0\.1);/box-shadow: $shadow-sm;/g
s/box-shadow: 0 8px 20px rgba(0,0,0,0\.1);/box-shadow: $shadow-md;/g
s/box-shadow: 0 8px 20px rgba(0,0,0,0\.12);/box-shadow: $shadow-md;/g
s/box-shadow: 0 -4px 20px rgba(0, 0, 0, 0\.15);/box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15); \/\* Negative offset - keep as-is \*\//g

# Brand-tinted shadows (emerald/green = warm)
s/box-shadow: 0 10px 30px rgba(77, 179, 128, 0\.15);/box-shadow: $shadow-warm-md;/g
s/box-shadow: 0 5px 15px rgba(77, 179, 128, 0\.2);/box-shadow: $shadow-warm-sm;/g
s/box-shadow: 0 5px 15px rgba(77, 179, 128, 0\.3);/box-shadow: $shadow-warm-md;/g
s/box-shadow: 0 10px 25px rgba(77, 179, 128, 0\.3);/box-shadow: $shadow-warm-lg;/g
s/box-shadow: 0 4px 12px rgba(77, 179, 128, 0\.3);/box-shadow: $shadow-warm-sm;/g
s/box-shadow: 0 6px 16px rgba(77, 179, 128, 0\.4);/box-shadow: $shadow-warm-md;/g
s/box-shadow: 0 5px 20px rgba(77, 179, 128, 0\.1);/box-shadow: $shadow-warm-sm;/g

# Focus rings (use design system focus if available, otherwise leave for now)
# These are functional and different from elevation shadows
s/box-shadow: 0 0 0 0\.2rem rgba(\$color-secondary, 0\.25);/box-shadow: 0 0 0 0.2rem rgba($color-secondary, 0.25); \/\* Focus ring - functional \*\//g
s/box-shadow: 0 0 0 0\.25rem rgba(\$color-secondary, 0\.25);/box-shadow: 0 0 0 0.25rem rgba($color-secondary, 0.25); \/\* Focus ring - functional \*\//g
s/box-shadow: 0 0 0 0\.2rem rgba(77, 179, 128, 0\.1);/box-shadow: 0 0 0 0.2rem rgba($green-400, 0.1); \/\* Focus ring - functional \*\//g

# Secondary color shadows
s/box-shadow: 0 4px 15px rgba(\$color-secondary, 0\.15);/box-shadow: $shadow-secondary;/g
s/box-shadow: 0 4px 12px rgba(\$color-primary, 0\.3);/box-shadow: $shadow-primary;/g

# Icon

## Description
Easy icon wrapper (Only works with SVG!)

## Tag
***c-icon***

## How to add icon
Due to license, I could not provide my own icon assets. But there are lot's of free icon packs out there. Just throw the svg icons into the icons folder located in CerceisUI. Then simply use the icon by specifying ***name="your icon name"***.

## Props
|Name|Type|Default|Description|
|---|---|---|---|
|**name**|string|""|Name of the icon to use. (Without extension).|
|**size**|IconSize|"md"|Size of the icon.|
|**setSrc**|String|null|Force to use an icon in different location. Must be absolute path.|

# Types / Interfaces
```
export type IconSize = "xs" | "sm" | "md" | "lg" 

export interface IconDimension{
	"xs": string,
	"sm": string,
	"md": string,
	"lg": string
}
```
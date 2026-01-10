import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}
const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElement);
  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) return null;

  const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
      newValues.styles = { ...values.styles, [field]: value };
    }
    setValues(newValues);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } });
  };
  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-49 animate-in fade-in slide-in-from-right-5">
      <h3 className="font-semibold text-blue-600">Edit Elements</h3>
      <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-lg">
        <X className="w-4 h-4 text-blue-600" />
      </button>
      <div className="space-y-4 text-black">
        <div>
          <label>Text Content</label>
          <textarea
            value={values.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full text-sm p-2 border border-md focus:ring-2 focus:ring-blue-600 outline-none min-h-20"
          ></textarea>
        </div>
        <div>
          <label>Name of Class</label>
          <input
            type="text"
            value={values.className || ""}
            onChange={(e) => handleChange("className", e.target.value)}
            className="w-full text-sm p-2 border border-md focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Padding
            </label>
            <input
              type="text"
              value={values.styles.padding}
              onChange={(e) => handleStyleChange("padding", e.target.value)}
              className="w-full text-sm p-2 border border-blue-600 border-md focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Margin
            </label>
            <input
              type="text"
              value={values.styles.margin}
              onChange={(e) => handleStyleChange("margin", e.target.value)}
              className="w-full text-sm p-2 border border-blue-600 border-md focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Font Size
            </label>
            <input
              type="text"
              value={values.styles.fontSize}
              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
              className="w-full text-sm p-2 border border-blue-600 border-md focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Background Colour
            </label>
            <div className="flex items-center gap-2 border border-blue-600 rounded-md p-1">
                <input
              type="color"
              value={values.styles.backgroundColor === 'rgba(0, 0, 0, 0)' ? '#ffffff' : values.styles.backgroundColor}
              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
              className="w-6 h-6 cursor-pointer border-none p-0"
            />
            <span className="tex-sm text-blue-400 truncate">{values.styles.backgroundColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Text Colour
            </label>
            <div className="flex items-center gap-2 border border-blue-600 rounded-md p-1">
                <input
              type="color"
              value={values.styles.color}
              onChange={(e) => handleStyleChange("color", e.target.value)}
              className="w-6 h-6 cursor-pointer border-none p-0"
            />
            <span className="tex-sm text-blue-400 truncate">{values.styles.color}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;

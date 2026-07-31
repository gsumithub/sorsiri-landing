import React, { useState } from "react";
import { showcaseData } from "../data/mockData";
import { simulateAiContentGeneration } from "../services/api";
import { 
  BsPlayFill, 
  BsCopy, 
  BsCheckLg, 
  BsLightningCharge, 
  BsArrowRepeat, 
  BsSliders,
  BsShieldCheck
} from "react-icons/bs";

export default function ProductShowcase() {
  const [activeTabId, setActiveTabId] = useState("content-engine");
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [selectedTone, setSelectedTone] = useState("Visionary & Data-Backed");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTab = showcaseData.tabs.find((t) => t.id === activeTabId) || showcaseData.tabs[0];

  const handleGenerate = async () => {
    if (!currentTab.prompts) return;
    const promptItem = currentTab.prompts[selectedPromptIndex];
    setIsGenerating(true);
    try {
      const res = await simulateAiContentGeneration(promptItem.promptText, selectedTone);
      setGeneratedText(res.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = generatedText || (currentTab.prompts ? currentTab.prompts[selectedPromptIndex].generatedContent : "");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="showcase-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag-pill">{showcaseData.sectionTag}</div>
          <h2 className="section-title">{showcaseData.sectionTitle}</h2>
          <p className="section-subtitle">{showcaseData.sectionSubtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="showcase-tab-bar">
          {showcaseData.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`showcase-tab-btn ${activeTabId === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTabId(tab.id);
                setGeneratedText("");
              }}
            >
              <span className="tab-btn-title">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Showcase Panel */}
        <div className="showcase-panel-frame">
          {/* Header Bar */}
          <div className="panel-header">
            <div className="panel-info">
              <h3 className="panel-tagline">{currentTab.tagline}</h3>
              <p className="panel-desc">{currentTab.description}</p>
            </div>
            <div className="panel-metrics-group">
              {currentTab.metrics.map((m, i) => (
                <div key={i} className="panel-metric-chip">
                  <span className="metric-chip-key">{m.key}</span>
                  <span className="metric-chip-val" style={{ color: m.color }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Content Body per Tab */}
          <div className="panel-body">
            {activeTabId === "content-engine" && (
              <div className="content-engine-interactive">
                {/* Controls Area */}
                <div className="interactive-controls">
                  <div className="control-group">
                    <label className="control-label">Select Demonstration Prompt:</label>
                    <div className="prompt-selector-btns">
                      {currentTab.prompts.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`prompt-chip-btn ${selectedPromptIndex === idx ? "active" : ""}`}
                          onClick={() => {
                            setSelectedPromptIndex(idx);
                            setGeneratedText("");
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="control-group row-group">
                    <div className="tone-selector">
                      <label className="control-label">
                        <BsSliders className="icon-mr" /> Tone Blueprint:
                      </label>
                      <select
                        className="tone-select-dropdown"
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value)}
                      >
                        <option value="Visionary & Data-Backed">Visionary & Data-Backed</option>
                        <option value="Authoritative & Direct">Authoritative & Direct</option>
                        <option value="Conversational & Engaging">Conversational & Engaging</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn-primary-glow btn-generate"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <BsArrowRepeat className="spin-icon" />
                          <span>Generating Draft...</span>
                        </>
                      ) : (
                        <>
                          <BsLightningCharge />
                          <span>Run AI Generator</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Preview Display Box */}
                <div className="output-display-box">
                  <div className="output-box-header">
                    <span className="output-tag">Simulated AI Output ({selectedTone})</span>
                    <button type="button" className="btn-copy" onClick={handleCopy}>
                      {copied ? <BsCheckLg className="icon-green" /> : <BsCopy />}
                      <span>{copied ? "Copied!" : "Copy Post"}</span>
                    </button>
                  </div>

                  <div className="output-box-content">
                    <pre className="output-text">
                      {generatedText || currentTab.prompts[selectedPromptIndex].generatedContent}
                    </pre>
                  </div>

                  <div className="output-box-footer">
                    <span className="footer-token-info">⚡ 284 tokens • 99.4% Brand Alignment • Zero Policy Flags</span>
                  </div>
                </div>
              </div>
            )}

            {activeTabId !== "content-engine" && (
              <div className="showcase-tab-sample">
                <div className="sample-card-header">
                  <h4 className="sample-title">{currentTab.sampleCard.title}</h4>
                  <span className="sample-status-pill">
                    <BsShieldCheck /> {currentTab.sampleCard.status}
                  </span>
                </div>
                <div className="sample-card-list">
                  {currentTab.sampleCard.items.map((item, idx) => (
                    <div key={idx} className="sample-list-row">
                      <span className="row-title">{item.platform || item.rule}</span>
                      <span className="row-detail">{item.score || item.detail || item.views}</span>
                      {item.trend && <span className="row-trend">{item.trend}</span>}
                      {item.engagement && <span className="row-engagement">{item.engagement}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

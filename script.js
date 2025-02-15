using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using NAudio.Wave;

namespace SoundPlayerApp
{
    public partial class MainForm : Form
    {
        private WaveOutEvent outputDevice;
        private AudioFileReader audioFile;
        private Dictionary<string, string> soundLibrary = new Dictionary<string, string>();
        private List<string> soundOrder = new List<string>();

        private TextBox txtSoundOrder;
        private Button btnLoadTable;
        private Button btnPlaySequence;

        public MainForm()
        {
            InitializeComponent();
            LoadSounds();
            SetupUI();
        }

        private void LoadSounds()
        {
            soundLibrary["Sound1"] = "path_to_sound1.wav";
            soundLibrary["Sound2"] = "path_to_sound2.wav";
            soundLibrary["Sound3"] = "path_to_sound3.wav";
        }

        private void SetupUI()
        {
            txtSoundOrder = new TextBox
            {
                Multiline = true,
                Width = 300,
                Height = 100,
                Location = new System.Drawing.Point(10, 10)
            };
            Controls.Add(txtSoundOrder);

            btnLoadTable = new Button
            {
                Text = "Load Sound Order",
                Location = new System.Drawing.Point(10, 120)
            };
            btnLoadTable.Click += BtnLoadTable_Click;
            Controls.Add(btnLoadTable);

            btnPlaySequence = new Button
            {
                Text = "Play Sequence",
                Location = new System.Drawing.Point(150, 120)
            };
            btnPlaySequence.Click += BtnPlaySequence_Click;
            Controls.Add(btnPlaySequence);
        }

        private void PlaySound(string soundName)
        {
            if (soundLibrary.ContainsKey(soundName))
            {
                outputDevice?.Dispose();
                audioFile?.Dispose();
                
                audioFile = new AudioFileReader(soundLibrary[soundName]);
                outputDevice = new WaveOutEvent();
                outputDevice.Init(audioFile);
                outputDevice.Play();
            }
        }

        private void BtnLoadTable_Click(object sender, EventArgs e)
        {
            soundOrder.Clear();
            string[] lines = txtSoundOrder.Text.Split(new[] {'\n', '\r'}, StringSplitOptions.RemoveEmptyEntries);
            foreach (string line in lines)
            {
                if (soundLibrary.ContainsKey(line.Trim()))
                {
                    soundOrder.Add(line.Trim());
                }
            }
        }

        private void BtnPlaySequence_Click(object sender, EventArgs e)
        {
            foreach (var sound in soundOrder)
            {
                PlaySound(sound);
                System.Threading.Thread.Sleep(1000); // Adjust delay as needed
            }
        }
    }
}

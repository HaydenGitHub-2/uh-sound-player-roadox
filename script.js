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

        public MainForm()
        {
            InitializeComponent();
            LoadSounds();
        }

        private void LoadSounds()
        {
            soundLibrary["Sound1"] = "path_to_sound1.wav";
            soundLibrary["Sound2"] = "path_to_sound2.wav";
            soundLibrary["Sound3"] = "path_to_sound3.wav";
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

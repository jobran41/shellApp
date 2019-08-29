const { exec } = require("child_process");
const fs = require("fs");
const db = require("_helpers/db");

const FileCloud = db.FileCloud;

const createFile = (req, res, next) => {
  exec(`cd .. && touch main.tf`, (error, stdout, stderr) => {
    fs.writeFile(`../main.tf`, "create your content", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
  res.send("file created");
};
/* app.get("/createFile",jwt, function(req, res) {
  exec(`touch main.tf`, (error, stdout, stderr) => {
    fs.writeFile(`main.tf`, "create your content", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
  res.send("file created");
}); */

const writeFile = (req, res) => {
  const { user, password, nameMachine ,memory,os,cpu,ram,getWay,netMask,adressIp} = req.body;
  let erroName=false
  const content = `
        provider "vsphere" {
            user           = "${user}"
            password       = "${password}"
            vsphere_server = "vc-vstack-002-ctt.tn.cloud-temple.lan"
          
            # If you have a self-signed cert
            allow_unverified_ssl = true
          }
          
          data "vsphere_datacenter" "dc" {
            name = "DC-DTX1"
          }
          
          /*data "vsphere_datastore" "datastore" {
            name          = "ds001-ctt-svc1-stor3-dtx1"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }*/
          
          data "vsphere_compute_cluster" "cluster" {
            name          = "clu001-ucs02_PRD"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }
          
          /*data "vsphere_resource_pool" "pool" {
            name          = "clu001-ucs02_PRD"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }*/
          
          data "vsphere_network" "network" {
            name          = "vm network"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }
          
          data "vsphere_datastore_cluster" "datastore_cluster" {
            name          = "sdrs001-LIVE_PROD"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }
          
          data "vsphere_virtual_machine" "template" {
            name          = "Test"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }
          
          data "vsphere_datastore" "iso_datastore" {
            name          = "ds002-ctt-svc1-stor3-dtx1"
            datacenter_id = "{data.vsphere_datacenter.dc.id}"
          }
          
          resource "vsphere_virtual_machine" "vm" {
          
            name             = "anasterraform"
            resource_pool_id = "{data.vsphere_compute_cluster.cluster.resource_pool_id}"
            //datastore_cluster_id = "{data.vsphere_datastore_cluster.datastore_cluster.id}"
           // wait_for_guest_net_timeout = "-1"
           scsi_type = "{data.vsphere_virtual_machine.template.scsi_type}"
          
            /*cdrom {
              datastore_id = "{data.vsphere_datastore.iso_datastore.id}"
              path         = "SW_DVD9_Win_Svr_STD_Core_and_DataCtr_Core_2016_64Bit_French_-2_MLF_X21-22829.ISO"
            }*/
          
            num_cpus = ${cpu}
            memory   = ${memory}
            guest_id = "{data.vsphere_virtual_machine.template.guest_id}"
            network_interface {
              network_id = "{data.vsphere_network.network.id}"
              adapter_type = "{data.vsphere_virtual_machine.template.network_interface_types[0]}"
            }
          
            disk {
                label            = "disk0"
                size             = "{data.vsphere_virtual_machine.template.disks.0.size}"
                eagerly_scrub    = "{data.vsphere_virtual_machine.template.disks.0.eagerly_scrub}"
                thin_provisioned = "{data.vsphere_virtual_machine.template.disks.0.thin_provisioned}"
              }

 
            clone {
              template_uuid = "{data.vsphere_virtual_machine.template.id}"
          
               customize {
                windows_options {
                  computer_name  = ${nameMachine}
                  workgroup      = "test"
                  admin_password = "VMw4re"
                }
          
                network_interface {
                  ipv4_address = ${adressIp}
                  ipv4_netmask = ${netMask}
                }
          
                ipv4_gateway = ${getWay}
          }
          }  
          }          
          `;
  fs.writeFile("../main.tf", content, async function(err) {
    if (err) {
      return console.log(err);
    }
    const file = new FileCloud(req.body);

    // validate
    if (await FileCloud.findOne({ nameMachine: req.body.nameMachine })) {
      erroName=true
      throw 'nameMachine "' + nameMachine + '" is already taken';
 
    }

    // save File
    await file.save();

    
    exec(`terraform.exe && terraform init && terraform plan && terraform apply`, (error, stdout, stderr) => {
        console.log(stdout,"ahmed")
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      }); 
  });
  if(erroName){
    res.send('nameMachine "' + nameMachine + '" is already taken');
  }else{
    res.send('The file was saved!');
  }
};

const  getAllFiles = async (req, res) => {
  console.log("jobran",req);

  const data = await FileCloud.find();
  res.send(data)


}

module.exports = { createFile, writeFile ,getAllFiles};

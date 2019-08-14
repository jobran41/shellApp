
        provider "vsphere" {
            user           = "joee23"
            password       = "fedf"
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
          
            num_cpus = 2
            memory   = 1024
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
                  computer_name  = "terraform-test"
                  workgroup      = "test"
                  admin_password = "VMw4re"
                }
          
                network_interface {
                  ipv4_address = "10.5.8.4"
                  ipv4_netmask = 24
                }
          
                ipv4_gateway = "10.5.8.254"
          }
          }  
          }          
          